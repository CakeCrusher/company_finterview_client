import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { InterviewEditor } from './components/interview/InterviewEditor';
import { ResultsView } from './components/results/ResultsView';
import { Interview, Task } from './types';
import { supabase } from './lib/supabase';

type AppView = 'dashboard' | 'editor' | 'results';

interface AppState {
  view: AppView;
  editingInterview: Interview | null;
  viewingResults: Interview | null;
}

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    view: 'dashboard',
    editingInterview: null,
    viewingResults: null
  });
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!user) return;
      setIsFetching(true);
      
      // Add mock interview with completed candidates for testing results view
      const mockInterviewWithResults: Interview = {
        id: 'mock-results-interview',
        title: 'BlackRock Finance Interview',
        status: 'closed',
        created_at: '2024-01-10T10:00:00Z',
        updated_at: '2024-01-15T12:00:00Z',
        owner_email: user.email,
        stats: {
          invited: 5,
          completed: 2,
          graded: 2
        },
        generalCriteria: [],
        tasks: [
          {
            id: 'task-1',
            interview_id: 'mock-results-interview',
            title: 'Financial Statements Impact',
            prompt: 'Walk me through the impact of a $10 increase in depreciation on the three financial statements',
            ai_behavior: 'neutral',
            duration_minutes: 15,
            req_audio: true,
            req_screen_share: false,
            req_webcam: true,
            req_file_upload: false,
            task_order: 1,
            supportingFiles: [],
            criteria: []
          },
          {
            id: 'task-2', 
            interview_id: 'mock-results-interview',
            title: 'Company Valuation',
            prompt: 'Find the equity value and enterprise value of this company',
            ai_behavior: 'neutral',
            duration_minutes: 20,
            req_audio: true,
            req_screen_share: false,
            req_webcam: true,
            req_file_upload: false,
            task_order: 2,
            supportingFiles: [],
            criteria: []
          }
        ]
      };
      
      const { data, error } = await supabase
        .from('interviews')
        .select('*, tasks(*, criteria(*)), generalCriteria:criteria!interview_id(*)')
        .eq('owner_email', user.email);

      if (error) {
        console.error('Error fetching interviews:', error);
      } else {
        const completeInterviews = data.map(i => ({
          ...i,
          tasks: i.tasks.map((t: any) => ({
            ...t,
            supportingFiles: [],
            criteria: t.criteria || [],
          })),
          generalCriteria: i.generalCriteria || [],
        }));
        
        // Add the mock interview to the beginning of the list
        setInterviews([mockInterviewWithResults, ...completeInterviews as Interview[]]);
      }
      setIsFetching(false);
    };

    fetchInterviews();
  }, [user]);

  const handleCreateInterview = async () => {
    if (!user?.email) return;

    const newInterviewPartial = {
      title: 'New Untitled Interview',
      owner_email: user.email,
    };

    const { data, error } = await supabase
      .from('interviews')
      .insert(newInterviewPartial)
      .select()
      .single();

    if (error) {
      console.error('Error creating interview:', error);
      return;
    }

    setInterviews([...interviews, {
      ...data,
      tasks: [],
      generalCriteria: [],
    }]);
    setAppState({
      view: 'editor',
      editingInterview: {
        ...data,
        tasks: [],
        generalCriteria: [],
      },
      viewingResults: null
    });
  };

  const handleEditInterview = (interview: Interview) => {
    // If interview has results (completed candidates), go to results view
    if (interview.stats && interview.stats.completed > 0) {
      setAppState({
        view: 'results',
        editingInterview: null,
        viewingResults: interview
      });
    } else {
      // Otherwise go to editor
      setAppState({
        view: 'editor',
        editingInterview: interview,
        viewingResults: null
      });
    }
  };

  const handleSaveInterview = async (updatedInterview: Interview) => {
    const { tasks, generalCriteria, stats, ...interviewData } = updatedInterview;

    const { data: savedInterview, error: interviewSaveError } = await supabase
      .from('interviews')
      .update({
        ...interviewData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', updatedInterview.id)
      .select()
      .single();

    if (interviewSaveError) {
      console.error('Error updating interview:', interviewSaveError);
      return;
    }

    const originalInterview = interviews.find(i => i.id === updatedInterview.id);
    const originalTasks = originalInterview?.tasks || [];

    const taskIdsToDelete = originalTasks
      .map(t => t.id)
      .filter(id => !tasks.some(ut => ut.id === id))
      .filter(id => !id.startsWith('new-task-'));

    if (taskIdsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .in('id', taskIdsToDelete);

      if (deleteError) console.error('Error deleting tasks:', deleteError);
    }

    const tasksToUpsert = tasks.map(task => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { supportingFiles, criteria, ...taskDto } = task;
      if (task.id.startsWith('new-task-')) {
        delete (taskDto as Partial<Task>).id;
      }
      return taskDto;
    });

    let savedTasks: Task[] = originalTasks.filter(t => !taskIdsToDelete.includes(t.id));

    if (tasksToUpsert.length > 0) {
      const { data: upsertedTasks, error: upsertError } = await supabase
        .from('tasks')
        .upsert(tasksToUpsert)
        .select();
      
      if (upsertError) {
        console.error('Error upserting tasks:', upsertError);
      } else if (upsertedTasks) {
        savedTasks = tasks.map(localTask => {
          const matchingDbTask = upsertedTasks.find(dbTask => 
            dbTask.id === localTask.id || 
            (localTask.id.startsWith('new-task-') && dbTask.task_order === localTask.task_order)
          );
          if (matchingDbTask) {
            return { ...localTask, id: matchingDbTask.id };
          }
          return localTask;
        }).filter(t => !taskIdsToDelete.includes(t.id));
      }
    }

    const originalGeneralCriteria = originalInterview?.generalCriteria || [];
    const originalTaskCriteria = originalInterview?.tasks.flatMap(t => t.criteria) || [];
    const allOriginalCriteria = [...originalGeneralCriteria, ...originalTaskCriteria];

    const updatedTaskCriteria = tasks.flatMap(t => t.criteria);
    const allUpdatedCriteria = [...generalCriteria, ...updatedTaskCriteria];

    const criteriaIdsToDelete = allOriginalCriteria
      .map(c => c.id)
      .filter(id => !allUpdatedCriteria.some(uc => uc.id === id));

    if (criteriaIdsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('criteria')
        .delete()
        .in('id', criteriaIdsToDelete);
      if (deleteError) console.error('Error deleting criteria:', deleteError);
    }
    
    const generalCriteriaToUpsert = generalCriteria.map(c => ({
      ...c,
      interview_id: updatedInterview.id,
    }));

    const taskCriteriaToUpsert = savedTasks.flatMap(task => 
      (task.criteria || []).map(c => ({
        ...c,
        task_id: task.id
      }))
    );

    const allCriteriaToUpsert = [...generalCriteriaToUpsert, ...taskCriteriaToUpsert].map(c => {
      const crit = c as any;
      const dto: { [key: string]: any } = {
        id: crit.id,
        name: crit.name,
        description: crit.description,
        type: crit.type,
        scope: crit.scope,
      };
      if (crit.interview_id) {
        dto.interview_id = crit.interview_id;
      }
      if (crit.task_id) {
        dto.task_id = crit.task_id;
      }
      return dto;
    });

    if (allCriteriaToUpsert.length > 0) {
      const { error: upsertError } = await supabase
        .from('criteria')
        .upsert(allCriteriaToUpsert)
        .select();
      if (upsertError) console.error('Error upserting criteria:', upsertError);
    }
    

    const newInterview: Interview = {
      ...(savedInterview as Interview),
      tasks: savedTasks.map(t => ({...t, supportingFiles: []})),
      generalCriteria,
      stats,
    };

    setInterviews(prev =>
      prev.map(interview =>
        interview.id === newInterview.id ? newInterview : interview
      )
    );

    setAppState(prev => ({
      ...prev,
      editingInterview: newInterview,
    }));
  };

  const handleBackToDashboard = () => {
    setAppState({
      view: 'dashboard',
      editingInterview: null,
      viewingResults: null
    });
  };

  const handleDeleteInterview = async (interview: Interview) => {
    console.log('Deleting interview:', interview);
    const { error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', interview.id);
    if (error) console.error('Error deleting interview:', error);
    setInterviews(prev => prev.filter(i => i.id !== interview.id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (appState.view === 'editor' && appState.editingInterview) {
    return (
      <InterviewEditor
        interview={appState.editingInterview}
        onSave={handleSaveInterview}
        onBack={handleBackToDashboard}
        onDelete={handleDeleteInterview}
      />
    );
  }

  if (appState.view === 'results' && appState.viewingResults) {
    return (
      <ResultsView
        interview={appState.viewingResults}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard
      interviews={interviews}
      isFetching={isFetching}
      onCreateInterview={handleCreateInterview}
      onEditInterview={handleEditInterview}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;