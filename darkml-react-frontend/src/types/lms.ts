export type EnrollmentStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED';

export interface LmsCourse {
  id: string;
  name: string;
  code: string;
  subject?: string;
  teacherName: string;
  division?: string;
  term?: string;
  enrollmentStatus?: EnrollmentStatus;
  progressPercent?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  availableAt?: string;
  dueDate?: string;
}

export type AssessmentStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export interface AssessmentSummary {
  id: string;
  courseId: string;
  title: string;
  type: 'QUIZ' | 'ASSIGNMENT' | 'EXAM' | 'PROJECT' | 'DISCUSSION';
  dueDate: string;
  status: AssessmentStatus;
  maxScore?: number;
}

export type SubmissionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';

export interface SubmissionSummary {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  status: SubmissionStatus;
  score?: number;
  maxScore?: number;
  submittedAt?: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  notes?: string;
}

export interface CourseAnnouncement {
  id: string;
  courseId: string;
  title: string;
  body: string;
  postedAt: string;
  postedBy?: string;
  priority?: 'NORMAL' | 'HIGH';
}

export interface CourseGradeItem {
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  maxScore: number;
  status: AssessmentStatus;
}

export interface CourseDetailResponse {
  course: LmsCourse;
  modules: CourseModule[];
  announcements: CourseAnnouncement[];
  assessments: AssessmentSummary[];
  submissions: SubmissionSummary[];
  grades: CourseGradeItem[];
  attendance: AttendanceRecord[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CourseListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  division?: string;
  term?: string;
  subject?: string;
}

export interface AssessmentListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: AssessmentStatus;
  courseId?: string;
}
