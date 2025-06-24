import React, { useState, useCallback } from 'react';
import { Save, Users, Settings, ArrowLeft, Eye, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { TaskPanel } from './TaskPanel';
import { TaskConfigForm } from './TaskConfigForm';
import { GeneralRubricModal } from './GeneralRubricModal';
import { InviteCandidatesModal } from './InviteCandidatesModal';
import { Interview, Task, Criterion } from '../../types';

interface InterviewEditorProps {
  interview: Interview;
  onSave: (interview: Interview) => void;
  onDelete: (interview: Interview) => void;
  onBack: () => void;
}

export const InterviewEditor: React.FC<InterviewEditorProps> = ({
  interview: initialInterview,
  onSave,
  onBack,
  onDelete,
}) => {
  const [interview, setInterview] = useState<Interview>(initialInterview);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    interview.tasks.length > 0 ? interview.tasks[0].id : null
  );
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const selectedTask = selectedTaskId 
    ? interview.tasks.find(t => t.id === selectedTaskId) || null
    : null;

  const updateInterview = useCallback((updates: Partial<Interview>) => {
    setInterview(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  }, []);

  const handleTaskSelect = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, []);

  const handleCreateTask = useCallback(() => {
    const newTask: Task = {
      id: `new-task-${Date.now()}`,
      interview_id: interview.id,
      title: 'New Task',
      prompt: '',
      ai_behavior: 'neutral',
      req_audio: true,
      req_screen_share: false,
      req_webcam: false,
      req_file_upload: false,
      supportingFiles: [],
      criteria: [],
      task_order: interview.tasks.length,
    };

    const updatedTasks = [...interview.tasks, newTask];
    updateInterview({ tasks: updatedTasks });
    setSelectedTaskId(newTask.id);
  }, [interview.id, interview.tasks, updateInterview]);

  const handleDeleteTask = useCallback((taskId: string) => {
    const updatedTasks = interview.tasks
      .filter(t => t.id !== taskId)
      .map((task, index) => ({ ...task, task_order: index }));
    
    updateInterview({ tasks: updatedTasks });
    
    if (selectedTaskId === taskId) {
      setSelectedTaskId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
    }
  }, [interview.tasks, selectedTaskId, updateInterview]);

  const handleReorderTasks = useCallback((reorderedTasks: Task[]) => {
    updateInterview({ tasks: reorderedTasks });
  }, [updateInterview]);

  const handleTaskChange = useCallback((updatedTask: Task) => {
    const updatedTasks = interview.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    updateInterview({ tasks: updatedTasks });
  }, [interview.tasks, updateInterview]);

  const handleGeneralCriteriaChange = useCallback((criteria: Criterion[]) => {
    updateInterview({ generalCriteria: criteria });
  }, [updateInterview]);

  const handleSave = useCallback(() => {
    const updatedInterview = {
      ...interview,
      updated_at: new Date().toISOString()
    };
    onSave(updatedInterview);
    setHasUnsavedChanges(false);
  }, [interview, onSave]);

  const handlePublish = useCallback(() => {
    const publishedInterview = {
      ...interview,
      status: 'live' as const,
      updated_at: new Date().toISOString()
    };
    onSave(publishedInterview);
    setHasUnsavedChanges(false);
    setIsInviteModalOpen(true);
  }, [interview, onSave]);

  const handleDelete = useCallback(() => {
    onDelete(interview);
  }, [onDelete, interview]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'live': return 'success';
      case 'draft': return 'warning';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const totalCriteria = interview.generalCriteria.length + 
    interview.tasks.reduce((sum, task) => sum + task.criteria.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                icon={ArrowLeft}
                onClick={onBack}
                className="text-gray-600"
              >
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <div className="flex items-center space-x-3">
                  <Input
                    value={interview.title}
                    onChange={(e) => updateInterview({ title: e.target.value })}
                    className="text-xl font-semibold text-gray-900 border-none focus:ring-0"
                  />
                  <Badge variant={getStatusVariant(interview.status)} className="capitalize">
                    {interview.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {interview.tasks.length} task{interview.tasks.length !== 1 ? 's' : ''} • {totalCriteria} evaluation criteria
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                icon={Settings}
                onClick={() => setIsRubricModalOpen(true)}
              >
                General Rubric ({interview.generalCriteria.length})
              </Button>

              {interview.status === 'draft' && (
                <>
                  <Button
                    variant="outline"
                    icon={Save}
                    onClick={handleSave}
                    disabled={!hasUnsavedChanges}
                  >
                    {hasUnsavedChanges ? 'Save Draft' : 'Saved'}
                  </Button>
                  <Button
                    variant="primary"
                    icon={Users}
                    onClick={handlePublish}
                    disabled={interview.tasks.length === 0}
                  >
                    Publish & Invite
                  </Button>
                </>
              )}

              {interview.status === 'live' && (
                <>
                  <Button
                    variant="outline"
                    icon={Save}
                    onClick={handleSave}
                    disabled={!hasUnsavedChanges}
                  >
                    {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                  </Button>
                  <Button
                    variant="primary"
                    icon={Users}
                    onClick={() => setIsInviteModalOpen(true)}
                  >
                    Invite Candidates
                  </Button>
                </>
              )}

              {interview.status === 'closed' && (
                <Button
                  variant="outline"
                  icon={Eye}
                  onClick={() => {/* TODO: Navigate to results */}}
                >
                  View Results
                </Button>
              )}

              <div className="w-px h-6 bg-gray-300" />

              <Button
                variant="danger"
                icon={Trash2}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Task Panel */}
        <TaskPanel
          tasks={interview.tasks}
          selectedTaskId={selectedTaskId}
          onSelectTask={handleTaskSelect}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onReorderTasks={handleReorderTasks}
        />

        {/* Configuration Form */}
        <div className="flex-1 overflow-y-auto">
          {selectedTask ? (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Task Configuration
                </h2>
                <p className="text-gray-600">
                  Configure the selected task's behavior, requirements, and evaluation criteria.
                </p>
              </div>
              
              <TaskConfigForm
                task={selectedTask}
                onChange={handleTaskChange}
              />
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>Select a task to configure it, or create a new one.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <GeneralRubricModal
        isOpen={isRubricModalOpen}
        onClose={() => setIsRubricModalOpen(false)}
        criteria={interview.generalCriteria}
        onChange={handleGeneralCriteriaChange}
      />
      
      <InviteCandidatesModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        interviewId={interview.id}
        interviewTitle={interview.title}
      />
    </div>
  );
};