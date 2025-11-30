import { apiClient } from './apiClient';
import {
  StudentPerformanceAnalytics,
  TopicMasterySummary,
  AssignmentBehaviorAnalytics,
  QuestionLevelAnalytics,
  WeakTopicAnalytics,
  DifficultyMasteryAnalytics,
  MasteryConfidenceIndex,
  FinalGradePrediction,
  RiskPrediction,
  WeakTopicPrediction,
  DifficultyMasteryPrediction,
} from '../types/models';

export const getStudentAnalytics = async (studentId: string) => {
  const res = await apiClient.get<{
    performance: StudentPerformanceAnalytics[];
    topicMastery: TopicMasterySummary[];
    behavior: AssignmentBehaviorAnalytics;
    questionLevel: QuestionLevelAnalytics[];
    weakTopics: WeakTopicAnalytics[];
    difficulty: DifficultyMasteryAnalytics[];
    mci: MasteryConfidenceIndex;
    predictions: {
      finalGrade: FinalGradePrediction;
      risk: RiskPrediction;
      weakTopics: WeakTopicPrediction;
      difficulty: DifficultyMasteryPrediction;
    };
  }>(`/api/analytics/students/${studentId}`);
  return res.data;
};

export const getCourseAnalytics = async (courseId: string) => {
  const res = await apiClient.get(`/api/analytics/courses/${courseId}`);
  return res.data;
};

export const getDivisionAnalytics = async (division: string) => {
  const res = await apiClient.get(`/api/analytics/divisions/${division}`);
  return res.data;
};

export const getSchoolAnalytics = async () => {
  const res = await apiClient.get('/api/analytics/school');
  return res.data;
};
