import { apiClient } from './apiClient';
import type { ChatResponse, WhatIfResponse, GeneratedQuestion, AIAssessmentGrade } from '../types/models';

// Chatbots
export const sendChatMessage = async (
  role: string,
  payload: { message: string; userId: string; role: string; extraContext?: any }
): Promise<ChatResponse> => {
  const res = await apiClient.post(`/api/ai/chat/${role}`, payload);
  return res.data;
};

// What-if engine
export const runWhatIf = async (question: string): Promise<WhatIfResponse> => {
  const res = await apiClient.post('/api/ai/what-if', { question });
  return res.data;
};

// Question generator
export const generateQuestions = async (payload: {
  topic: string;
  gradeLevel: string;
  difficulty: string;
  type: string;
}): Promise<GeneratedQuestion[]> => {
  const res = await apiClient.post('/api/ai/questions/generate', payload);
  return res.data.questions;
};

// AI grading
export const getAIAssessmentGrade = async (
  studentId: string,
  assessmentId: string
): Promise<AIAssessmentGrade> => {
  const res = await apiClient.get(
    `/api/ai/grading/${studentId}/${assessmentId}`
  );
  return res.data;
};

export const submitAIOverride = async (payload: {
  studentId: string;
  assessmentId: string;
  finalGrade: number;
  feedback: string;
}) => {
  const res = await apiClient.post('/api/ai/grading/override', payload);
  return res.data;
};
