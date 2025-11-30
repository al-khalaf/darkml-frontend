import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import type {
  AssessmentListParams,
  AssessmentSummary,
  PaginatedResponse,
} from '../types/lms';

export const fetchStudentAssessments = async (
  params: AssessmentListParams,
): Promise<PaginatedResponse<AssessmentSummary>> => {
  const response = await apiClient.get<PaginatedResponse<AssessmentSummary>>(
    '/api/lms/student/assessments',
    {
      params,
    },
  );
  return response.data;
};

export const useStudentAssessmentsQuery = (params: AssessmentListParams) =>
  useQuery<PaginatedResponse<AssessmentSummary>>({
    queryKey: ['student-assessments', params],
    queryFn: () => fetchStudentAssessments(params),
    keepPreviousData: true,
  });
