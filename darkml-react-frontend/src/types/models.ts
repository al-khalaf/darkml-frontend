// ===============================
// Core LMS Models
// ===============================

export interface Student {
  id: string;
  name: string;
  gradeLevel: string;
  division?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  division: string;
  schedule?: string[];
}

export interface StudentCourse {
  id: string;
  studentId: string;
  courseId: string;
  year: number;
  quarter: number;
}

export type AssessmentType =
  | 'TEST'
  | 'QUIZ'
  | 'ASSIGNMENT'
  | 'PARTICIPATION'
  | 'EXAM';

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: AssessmentType;
  dueDate: string;
}

export interface StudentAssessment {
  id: string;
  studentId: string;
  assessmentId: string;
  score: number | null;
  submittedAt?: string;
  isLate: boolean;
}

// Attendance & participation
export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
}

export interface Participation {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  score: number;
}

// Online assessment layers
export type QuestionType = 'MCQ' | 'SHORT' | 'ESSAY';

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  questionText: string;
  topic: string;
  difficulty: string;
  type: QuestionType;
}

export interface StudentAssessmentResponse {
  id: string;
  studentId: string;
  questionId: string;
  correct: boolean | null;
  score: number | null;
  responseText?: string;
}

// ===============================
// Analytics Models
// ===============================

export interface StudentPerformanceAnalytics {
  studentId: string;
  courseId: string;
  averageScore: number;
  assignmentCompletionRate: number;
  riskLevel: string;
}

export interface TopicMasterySummary {
  topic: string;
  mastery: number;
}

export interface AssignmentBehaviorAnalytics {
  lateSubmissions: number;
  missingSubmissions: number;
  earlySubmissions: number;
}

export interface QuestionLevelAnalytics {
  questionId: string;
  correctRate: number;
  timeAvg: number;
}

export interface WeakTopicAnalytics {
  topic: string;
  weaknessScore: number;
}

export interface DifficultyMasteryAnalytics {
  difficulty: string;
  mastery: number;
}

export interface MasteryConfidenceIndex {
  studentId: string;
  courseId: string;
  mci: number;
}

// Predictions
export interface FinalGradePrediction {
  predictedFinalGrade: number;
}

export interface RiskPrediction {
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface WeakTopicPrediction {
  topics: string[];
}

export interface DifficultyMasteryPrediction {
  predictedMastery: number;
}

// ===============================
// AI Models
// ===============================

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  messages: ChatMessage[];
}

export interface WhatIfSeries {
  label: string;
  data: number[];
  categories: string[];
}

export interface WhatIfResponse {
  explanation: string;
  series: WhatIfSeries[];
}

export interface GeneratedQuestion {
  question: string;
  answer: string;
  topic: string;
  difficulty: string;
  type: string;
}

// AI Grading
export interface AIAssessmentGrade {
  studentId: string;
  assessmentId: string;
  aiSuggestedGrade: number;
  rubric: { criterion: string; score: number }[];
  feedback: string;
}

// ===============================
// Governance Models
// ===============================

export interface AIModuleState {
  id: string;
  moduleName: string;
  mode: 'AUTO' | 'ASSISTED' | 'OFF';
  thresholds: Record<string, number>;
}

export interface AIOverrideLogEntry {
  id: string;
  module: string;
  studentId: string;
  teacherId: string;
  severity: string;
  reason: string;
  createdAt: string;
}

export interface AIIncident {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  title: string;
  description: string;
  createdAt: string;
}

export interface AICalibrationRun {
  id: string;
  module: string;
  phase: string;
  alignment: number;
  consistency: number;
  passed: boolean;
}

export interface AIMonitoringSnapshot {
  id: string;
  module: string;
  mismatchRate: number;
  overrideRate: number;
  hallucinationRate: number;
  timestamp: string;
}

export interface AIOverrideRequest {
  studentId: string;
  assessmentId: string;
  finalGrade: number;
  feedback: string;
}
