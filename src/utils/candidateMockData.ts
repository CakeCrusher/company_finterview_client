import { CandidateResult, CandidatePerformanceData } from '../types/candidate';

export const mockCandidateResults: CandidateResult[] = [
  {
    id: 'candidate-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    completedAt: '2024-01-22T14:30:00Z',
    overallScore: 4.2,
    scores: [
      { criterionId: 'comm-general', criterionName: 'Communication.general', score: 4 },
      { criterionId: 'prof-general', criterionName: 'Professionalism.general', score: 5 },
      { criterionId: 'depth-task1', criterionName: 'Depth of Answer.task1', score: 4 },
      { criterionId: 'clarity-task1', criterionName: 'Clarity.task1', score: 4 },
      { criterionId: 'excel-task2', criterionName: 'Excel Cleanliness.task2', score: 3 },
      { criterionId: 'calc-task2', criterionName: 'Calculation Accuracy.task2', score: 5 }
    ],
    notes: [
      {
        author: 'AI Interviewer',
        column: 'Communication.general',
        content: 'Clear articulation and confident tone throughout the interview.',
        createdAt: '2024-01-22T14:35:00Z'
      },
      {
        author: 'John Smith',
        column: 'Excel Cleanliness.task2',
        content: 'Model structure could be improved, but calculations were correct.',
        createdAt: '2024-01-22T15:00:00Z'
      }
    ]
  },
  {
    id: 'candidate-2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    completedAt: '2024-01-22T16:15:00Z',
    overallScore: 3.8,
    scores: [
      { criterionId: 'comm-general', criterionName: 'Communication.general', score: 3 },
      { criterionId: 'prof-general', criterionName: 'Professionalism.general', score: 4 },
      { criterionId: 'depth-task1', criterionName: 'Depth of Answer.task1', score: 4 },
      { criterionId: 'clarity-task1', criterionName: 'Clarity.task1', score: 3 },
      { criterionId: 'excel-task2', criterionName: 'Excel Cleanliness.task2', score: 5 },
      { criterionId: 'calc-task2', criterionName: 'Calculation Accuracy.task2', score: 4 }
    ],
    notes: [
      {
        author: 'AI Interviewer',
        column: 'Communication.general',
        content: 'Occasionally hesitant in responses, but improved throughout the interview.',
        createdAt: '2024-01-22T16:20:00Z'
      }
    ]
  },
  {
    id: 'candidate-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    completedAt: '2024-01-23T10:45:00Z',
    overallScore: 4.5,
    scores: [
      { criterionId: 'comm-general', criterionName: 'Communication.general', score: 5 },
      { criterionId: 'prof-general', criterionName: 'Professionalism.general', score: 5 },
      { criterionId: 'depth-task1', criterionName: 'Depth of Answer.task1', score: 5 },
      { criterionId: 'clarity-task1', criterionName: 'Clarity.task1', score: 5 },
      { criterionId: 'excel-task2', criterionName: 'Excel Cleanliness.task2', score: 4 },
      { criterionId: 'calc-task2', criterionName: 'Calculation Accuracy.task2', score: 3 }
    ],
    notes: [
      {
        author: 'AI Interviewer',
        column: 'Communication.general',
        content: 'Exceptional communication skills with structured responses.',
        createdAt: '2024-01-23T10:50:00Z'
      },
      {
        author: 'John Smith',
        column: 'Calculation Accuracy.task2',
        content: 'Minor calculation error but showed good problem-solving approach.',
        createdAt: '2024-01-23T11:15:00Z'
      }
    ]
  },
  {
    id: 'candidate-4',
    name: 'David Park',
    email: 'david.park@email.com',
    completedAt: '2024-01-23T14:20:00Z',
    overallScore: 3.5,
    scores: [
      { criterionId: 'comm-general', criterionName: 'Communication.general', score: 3 },
      { criterionId: 'prof-general', criterionName: 'Professionalism.general', score: 4 },
      { criterionId: 'depth-task1', criterionName: 'Depth of Answer.task1', score: 3 },
      { criterionId: 'clarity-task1', criterionName: 'Clarity.task1', score: 4 },
      { criterionId: 'excel-task2', criterionName: 'Excel Cleanliness.task2', score: 3 },
      { criterionId: 'calc-task2', criterionName: 'Calculation Accuracy.task2', score: 4 }
    ],
    notes: []
  },
  {
    id: 'candidate-5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    completedAt: '2024-01-24T09:30:00Z',
    overallScore: 4.0,
    scores: [
      { criterionId: 'comm-general', criterionName: 'Communication.general', score: 4 },
      { criterionId: 'prof-general', criterionName: 'Professionalism.general', score: 4 },
      { criterionId: 'depth-task1', criterionName: 'Depth of Answer.task1', score: 4 },
      { criterionId: 'clarity-task1', criterionName: 'Clarity.task1', score: 4 },
      { criterionId: 'excel-task2', criterionName: 'Excel Cleanliness.task2', score: 4 },
      { criterionId: 'calc-task2', criterionName: 'Calculation Accuracy.task2', score: 4 }
    ],
    notes: [
      {
        author: 'AI Interviewer',
        column: 'Communication.general',
        content: 'Consistent performance across all areas with room for growth.',
        createdAt: '2024-01-24T09:35:00Z'
      }
    ]
  }
];

export const mockPerformanceData: CandidatePerformanceData = {
  candidates: [
    {
      id: '1',
      name: 'Catherine Thompson',
      email: 'catherine.thompson@email.com',
      completedAt: '2024-01-15T10:30:00Z',
      overallScore: 4.2,
      scores: [
        // Task 1 - Assistant scores (Financial Statements)
        { criterionId: 'income_statement_accuracy', criterionName: 'Income Statement Accuracy', score: 4 },
        { criterionId: 'cash_flow_accuracy', criterionName: 'Cash Flow Accuracy', score: 4 },
        { criterionId: 'balance_sheet_accuracy', criterionName: 'Balance Sheet Accuracy', score: 3 },
        { criterionId: 'cheating_suspected', criterionName: 'Cheating Suspected', score: false },
        { criterionId: 'general_feedback_task1', criterionName: 'General Feedback (Task 1)', score: 'Excellent understanding of financial statement interconnections. Applied tax shield correctly and showed strong analytical skills.' },
        
        // Task 2 - Assistant2 scores (Valuation)
        { criterionId: 'prompt_for_share_price', criterionName: 'Prompt for Share Price', score: 2 },
        { criterionId: 'equity_value_calculation', criterionName: 'Equity Value Calculation', score: 2 },
        { criterionId: 'ev_subtract_cash', criterionName: 'EV Subtract Cash', score: 1 },
        { criterionId: 'ev_add_debt', criterionName: 'EV Add Debt', score: 1 },
        { criterionId: 'ev_add_preferred_stock', criterionName: 'EV Add Preferred Stock', score: 1 },
        { criterionId: 'ev_formula_structure', criterionName: 'EV Formula Structure', score: 2 },
        { criterionId: 'ev_sign_penalties', criterionName: 'EV Sign Penalties', score: 0 },
        { criterionId: 'logical_flow_and_clarity', criterionName: 'Logical Flow and Clarity', score: 2 },
        { criterionId: 'communication_and_composure', criterionName: 'Communication and Composure', score: 1 },
        { criterionId: 'general_feedback_task2', criterionName: 'General Feedback (Task 2)', score: 'Strong valuation fundamentals. Asked appropriate questions and executed calculations methodically with clear reasoning.' }
      ],
      notes: [
        {
          author: 'System',
          column: 'general_feedback_task1',
          content: 'Excellent understanding of financial statement interconnections. Applied tax shield correctly and showed strong analytical skills.',
          createdAt: '2024-01-15T10:45:00Z'
        }
      ]
    },
    {
      id: '2', 
      name: 'Sebastian Rodriguez',
      email: 'sebastian.rodriguez@email.com',
      completedAt: '2024-01-15T11:00:00Z',
      overallScore: 1.3,
      scores: [
        // Task 1 - Assistant scores (Financial Statements)
        { criterionId: 'income_statement_accuracy', criterionName: 'Income Statement Accuracy', score: 1 },
        { criterionId: 'cash_flow_accuracy', criterionName: 'Cash Flow Accuracy', score: 0 },
        { criterionId: 'balance_sheet_accuracy', criterionName: 'Balance Sheet Accuracy', score: 1 },
        { criterionId: 'cheating_suspected', criterionName: 'Cheating Suspected', score: false },
        { criterionId: 'general_feedback_task1', criterionName: 'General Feedback (Task 1)', score: 'Struggled with basic financial statement concepts. Did not understand tax implications or cash flow impacts. Needs significant improvement.' },
        
        // Task 2 - Assistant2 scores (Valuation)
        { criterionId: 'prompt_for_share_price', criterionName: 'Prompt for Share Price', score: 0 },
        { criterionId: 'equity_value_calculation', criterionName: 'Equity Value Calculation', score: 0 },
        { criterionId: 'ev_subtract_cash', criterionName: 'EV Subtract Cash', score: 0 },
        { criterionId: 'ev_add_debt', criterionName: 'EV Add Debt', score: 0 },
        { criterionId: 'ev_add_preferred_stock', criterionName: 'EV Add Preferred Stock', score: 0 },
        { criterionId: 'ev_formula_structure', criterionName: 'EV Formula Structure', score: 0 },
        { criterionId: 'ev_sign_penalties', criterionName: 'EV Sign Penalties', score: 3 },
        { criterionId: 'logical_flow_and_clarity', criterionName: 'Logical Flow and Clarity', score: 0 },
        { criterionId: 'communication_and_composure', criterionName: 'Communication and Composure', score: 0 },
        { criterionId: 'general_feedback_task2', criterionName: 'General Feedback (Task 2)', score: 'Poor understanding of valuation concepts. Made multiple sign errors and did not ask for required information. Needs fundamental training.' }
      ],
      notes: [
        {
          author: 'System',
          column: 'general_feedback_task1', 
          content: 'Struggled with basic financial statement concepts. Did not understand tax implications or cash flow impacts. Needs significant improvement.',
          createdAt: '2024-01-15T11:15:00Z'
        }
      ]
    }
  ],
  criteriaColumns: [
    // Task 1 - Financial Statements Analysis
    { id: 'income_statement_accuracy', name: 'Income Statement Accuracy', type: 'numeric', scope: 'task', taskName: 'Financial Statements Impact' },
    { id: 'cash_flow_accuracy', name: 'Cash Flow Accuracy', type: 'numeric', scope: 'task', taskName: 'Financial Statements Impact' },
    { id: 'balance_sheet_accuracy', name: 'Balance Sheet Accuracy', type: 'numeric', scope: 'task', taskName: 'Financial Statements Impact' },
    { id: 'cheating_suspected', name: 'Cheating Suspected', type: 'boolean', scope: 'task', taskName: 'Financial Statements Impact' },
    { id: 'general_feedback_task1', name: 'General Feedback (Task 1)', type: 'text', scope: 'task', taskName: 'Financial Statements Impact' },
    
    // Task 2 - Valuation Analysis  
    { id: 'prompt_for_share_price', name: 'Prompt for Share Price', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'equity_value_calculation', name: 'Equity Value Calculation', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'ev_subtract_cash', name: 'EV Subtract Cash', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'ev_add_debt', name: 'EV Add Debt', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'ev_add_preferred_stock', name: 'EV Add Preferred Stock', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'ev_formula_structure', name: 'EV Formula Structure', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'ev_sign_penalties', name: 'EV Sign Penalties', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'logical_flow_and_clarity', name: 'Logical Flow and Clarity', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'communication_and_composure', name: 'Communication and Composure', type: 'numeric', scope: 'task', taskName: 'Company Valuation' },
    { id: 'general_feedback_task2', name: 'General Feedback (Task 2)', type: 'text', scope: 'task', taskName: 'Company Valuation' }
  ]
};