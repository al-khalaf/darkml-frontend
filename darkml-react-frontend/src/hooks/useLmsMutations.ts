import { useMutation } from '@tanstack/react-query';
import {
  acknowledgeAnnouncement,
  acknowledgeAssessmentFeedback,
  submitAssessment,
  updateAttendanceRecord,
  updateCourseEnrollment,
} from '../api/lmsApi';
import type { Attendance } from '../types/models';

type EnrollmentAction = 'ENROLL' | 'DROP' | 'SYNC_TO_CALENDAR';

type SubmissionPayload = {
  assessmentId: string;
  studentId: string;
  answers?: Record<string, string>;
};

type FeedbackAckPayload = {
  assessmentId: string;
  studentId: string;
};

type AnnouncementAckPayload = {
  announcementId: string;
  studentId: string;
};

type AttendanceUpdatePayload = {
  attendanceId: string;
  status: Attendance['status'];
};

type EnrollmentUpdatePayload = {
  courseId: string;
  studentId: string;
  action: EnrollmentAction;
};

export const useSubmitAssessment = () =>
  useMutation({
    mutationFn: (payload: SubmissionPayload) => submitAssessment(payload),
  });

export const useAcknowledgeFeedback = () =>
  useMutation({
    mutationFn: (payload: FeedbackAckPayload) =>
      acknowledgeAssessmentFeedback(payload),
  });

export const useAcknowledgeAnnouncement = () =>
  useMutation({
    mutationFn: (payload: AnnouncementAckPayload) =>
      acknowledgeAnnouncement(payload),
  });

export const useAttendanceUpdate = () =>
  useMutation({
    mutationFn: (payload: AttendanceUpdatePayload) => updateAttendanceRecord(payload),
  });

export const useEnrollmentUpdate = () =>
  useMutation({
    mutationFn: (payload: EnrollmentUpdatePayload) => updateCourseEnrollment(payload),
  });
