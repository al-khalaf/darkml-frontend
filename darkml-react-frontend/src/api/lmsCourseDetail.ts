import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import type { CourseDetailResponse } from '../types/lms';

export const fetchStudentCourseDetail = async (
  courseId: string,
): Promise<CourseDetailResponse> => {
  const response = await apiClient.get<CourseDetailResponse>(
    `/api/lms/student/courses/${courseId}`,
  );
  return response.data;
};

export const useStudentCourseDetailQuery = (courseId?: string) =>
  useQuery<CourseDetailResponse>({
    queryKey: ['student-course-detail', courseId],
    queryFn: () => {
      if (!courseId) {
        throw new Error('courseId is required');
      }
      return fetchStudentCourseDetail(courseId);
    },
    enabled: Boolean(courseId),
  });
