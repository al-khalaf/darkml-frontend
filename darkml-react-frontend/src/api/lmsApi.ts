import { apiClient } from './apiClient';
import type {
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

// Mutations
export const submitAssessment = async (payload: {
  assessmentId: string;
  studentId: string;
  answers?: Record<string, string>;
}) => {
  const { assessmentId, ...body } = payload;
  const res = await apiClient.post(
    `/api/lms/assessments/${assessmentId}/submissions`,
    body
  );
  return res.data;
};

export const acknowledgeAssessmentFeedback = async (payload: {
  assessmentId: string;
  studentId: string;
}) => {
  const { assessmentId, ...body } = payload;
  const res = await apiClient.post(
    `/api/lms/assessments/${assessmentId}/feedback/acknowledge`,
    body
  );
  return res.data;
};

export const updateAttendanceRecord = async (payload: {
  attendanceId: string;
  status: Attendance['status'];
}) => {
  const { attendanceId, ...body } = payload;
  const res = await apiClient.patch(`/api/lms/attendance/${attendanceId}`, body);
  return res.data;
};

export const acknowledgeAnnouncement = async (payload: {
  announcementId: string;
  studentId: string;
}) => {
  const { announcementId, ...body } = payload;
  const res = await apiClient.post(
    `/api/lms/announcements/${announcementId}/acknowledgements`,
    body
  );
  return res.data;
};

export const updateCourseEnrollment = async (payload: {
  courseId: string;
  studentId: string;
  action: 'ENROLL' | 'DROP' | 'SYNC_TO_CALENDAR';
}) => {
  const { courseId, ...body } = payload;
  const res = await apiClient.post(
    `/api/lms/courses/${courseId}/enrollment`,
    body
  );
  return res.data;
};
