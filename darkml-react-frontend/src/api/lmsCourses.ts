import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import type { CourseListParams, LmsCourse, PaginatedResponse } from '../types/lms';

export const fetchMyCourses = async (
  params: CourseListParams,
): Promise<PaginatedResponse<LmsCourse>> => {
  const response = await apiClient.get<PaginatedResponse<LmsCourse>>('/api/lms/student/courses', {
    params,
  });
  return response.data;
};

export const useMyCoursesQuery = (params: CourseListParams) =>
  useQuery<PaginatedResponse<LmsCourse>>({
    queryKey: ['student-courses', params],
    queryFn: () => fetchMyCourses(params),
    keepPreviousData: true,
  });
