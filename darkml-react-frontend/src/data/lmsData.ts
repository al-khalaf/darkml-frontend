import { Assessment, Course } from '../types/models';

export const teacherDirectory: Record<string, string> = {
  'teacher-001': 'Ms. Smith',
  'teacher-002': 'Dr. Brown',
  'teacher-003': 'Mr. Lee',
  'teacher-004': 'Ms. Johnson',
};

export const courseCatalog: Course[] = [
  {
    id: 'course-alg-101',
    name: 'Algebra I',
    code: 'ALG-101',
    teacherId: 'teacher-001',
    division: 'HS',
    schedule: ['Mon', 'Wed'],
  },
  {
    id: 'course-bio-201',
    name: 'Biology',
    code: 'BIO-201',
    teacherId: 'teacher-002',
    division: 'HS',
    schedule: ['Tue', 'Thu'],
  },
  {
    id: 'course-his-110',
    name: 'World History',
    code: 'HIS-110',
    teacherId: 'teacher-003',
    division: 'MS',
    schedule: ['Mon', 'Thu'],
  },
  {
    id: 'course-eng-130',
    name: 'English Literature',
    code: 'ENG-130',
    teacherId: 'teacher-004',
    division: 'HS',
    schedule: ['Wed', 'Fri'],
  },
];

export const studentEnrollments = [
  { courseId: 'course-alg-101', teacherId: 'teacher-001' },
  { courseId: 'course-bio-201', teacherId: 'teacher-002' },
  { courseId: 'course-his-110', teacherId: 'teacher-003' },
  { courseId: 'course-eng-130', teacherId: 'teacher-004' },
];

export const assessmentLibrary: Assessment[] = [
  {
    id: 'assessment-alg-quiz-3',
    courseId: 'course-alg-101',
    title: 'Algebra Quiz 3',
    type: 'QUIZ',
    dueDate: '2025-11-26',
  },
  {
    id: 'assessment-his-essay-1',
    courseId: 'course-his-110',
    title: 'History Essay',
    type: 'ASSIGNMENT',
    dueDate: '2025-11-24',
  },
  {
    id: 'assessment-bio-quiz-1',
    courseId: 'course-bio-201',
    title: 'Biology Quiz 1',
    type: 'QUIZ',
    dueDate: '2025-11-20',
  },
];

export const getCourseById = (courseId?: string) =>
  courseCatalog.find((course) => course.id === courseId);

export const getAssessmentById = (assessmentId?: string) =>
  assessmentLibrary.find((assessment) => assessment.id === assessmentId);

export const getTeacherName = (teacherId?: string) =>
  (teacherId && teacherDirectory[teacherId]) || 'Unknown instructor';
