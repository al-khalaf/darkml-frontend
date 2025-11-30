import { apiClient } from './apiClient';
import  type {
  Course,
  StudentCourse,
  Assessment,
  Attendance,
  Participation,
} from '../types/models';

// Dashboard data
export const getStudentDashboard = async (studentId: string) => {
  const res = await apiClient.get(`/api/lms/students/${studentId}/dashboard`);
  return res.data;
};

// Courses
export const getCourses = async () => {
  const res = await apiClient.get<Course[]>('/api/lms/courses');
  return res.data;
};

export const getCourseDetail = async (courseId: string) => {
  const res = await apiClient.get(`/api/lms/courses/${courseId}`);
  return res.data;
};

export const getMyCourses = async (studentId: string) => {
  const res = await apiClient.get<StudentCourse[]>(
    `/api/lms/students/${studentId}/courses`
  );
  return res.data;
};

// Assessments
export const getAssessments = async (courseId: string) => {
  const res = await apiClient.get<Assessment[]>(
    `/api/lms/courses/${courseId}/assessments`
  );
  return res.data;
};

export const getAssessmentDetail = async (assessmentId: string) => {
  const res = await apiClient.get(`/api/lms/assessments/${assessmentId}`);
  return res.data;
};

// Attendance
export const getAttendance = async (studentId: string) => {
  const res = await apiClient.get<Attendance[]>(
    `/api/lms/students/${studentId}/attendance`
  );
  return res.data;
};

// Participation
export const getParticipation = async (studentId: string) => {
  const res = await apiClient.get<Participation[]>(
    `/api/lms/students/${studentId}/participation`
  );
  return res.data;
};
