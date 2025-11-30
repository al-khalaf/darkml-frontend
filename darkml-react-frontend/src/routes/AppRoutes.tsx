import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/guards/ProtectedRoute';

// AUTH
import LoginPage from '../pages/auth/LoginPage';

// DASHBOARDS
import StudentDashboardPage from '../pages/dashboard/StudentDashboardPage';
import TeacherDashboardPage from '../pages/dashboard/TeacherDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import SuperAdminDashboardPage from '../pages/dashboard/SuperAdminDashboardPage';

// LMS
import MyCoursesPage from '../pages/lms/MyCoursesPage';
import CoursesPage from '../pages/lms/CoursesPage';
import CourseDetailPage from '../pages/lms/CourseDetailPage';
import StudentCourseDetailPage from '../pages/lms/StudentCourseDetailPage';
import AssessmentsPage from '../pages/lms/AssessmentsPage';
import AssessmentDetailPage from '../pages/lms/AssessmentDetailPage';
import AttendancePage from '../pages/lms/AttendancePage';
import ParticipationPage from '../pages/lms/ParticipationPage';
import TeacherAttendancePage from '../pages/lms/TeacherAttendancePage';
import TeacherParticipationPage from '../pages/lms/TeacherParticipationPage';
import GradebookPage from '../pages/lms/GradebookPage';
import StudentProfilePage from '../pages/lms/StudentProfilePage';
import StudentTakeAssessmentPage from '../pages/lms/StudentTakeAssessmentPage';
import PracticeAndLearnPage from '../pages/lms/PracticeAndLearnPage';

// ANALYTICS
import StudentAnalyticsPage from '../pages/analytics/StudentAnalyticsPage';
import ClassAnalyticsPage from '../pages/analytics/ClassAnalyticsPage';
import DivisionAnalyticsPage from '../pages/analytics/DivisionAnalyticsPage';
import SchoolAnalyticsPage from '../pages/analytics/SchoolAnalyticsPage';

// AI
import StudentChatbotPage from '../pages/ai/StudentChatbotPage';
import TeacherChatbotPage from '../pages/ai/TeacherChatbotPage';
import AdminChatbotPage from '../pages/ai/AdminChatbotPage';
import SuperAdminChatbotPage from '../pages/ai/SuperAdminChatbotPage';
import WhatIfEnginePage from '../pages/ai/WhatIfEnginePage';
import QuestionGeneratorPage from '../pages/ai/QuestionGeneratorPage';
import AIGradingPage from '../pages/ai/AIGradingPage';

// GOVERNANCE
import AIModuleStatePage from '../pages/governance/AIModuleStatePage';
import AIOverrideLogPage from '../pages/governance/AIOverrideLogPage';
import AIIncidentsPage from '../pages/governance/AIIncidentsPage';
import AICalibrationRunsPage from '../pages/governance/AICalibrationRunsPage';
import AIMonitoringSnapshotsPage from '../pages/governance/AIMonitoringSnapshotsPage';

// ERRORS
import NotFoundPage from '../pages/errors/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* STUDENT */}
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/lms/my-courses" element={<MyCoursesPage />} />
        <Route path="/lms/student/courses/:courseId" element={<StudentCourseDetailPage />} />
        <Route path="/lms/assessments" element={<AssessmentsPage />} />
        <Route path="/lms/assessments/:assessmentId/take" element={<StudentTakeAssessmentPage />} />
        <Route path="/lms/attendance" element={<AttendancePage />} />
        <Route path="/lms/participation" element={<ParticipationPage />} />
        <Route path="/lms/student-profile" element={<StudentProfilePage />} />
        <Route path="/analytics/student" element={<StudentAnalyticsPage />} />
        <Route path="/student/practice" element={<PracticeAndLearnPage />} />
        <Route path="/ai/chat/student" element={<StudentChatbotPage />} />

        {/* TEACHER */}
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/lms/courses" element={<CoursesPage />} />
        <Route path="/lms/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/lms/courses/:courseId/gradebook" element={<GradebookPage />} />
        <Route path="/lms/teacher-attendance" element={<TeacherAttendancePage />} />
        <Route path="/lms/teacher-participation" element={<TeacherParticipationPage />} />
        <Route path="/lms/assessments/:assessmentId" element={<AssessmentDetailPage />} />
        <Route path="/analytics/class" element={<ClassAnalyticsPage />} />
        <Route path="/ai/chat/teacher" element={<TeacherChatbotPage />} />
        <Route path="/ai/questions" element={<QuestionGeneratorPage />} />
        <Route path="/ai/grading" element={<AIGradingPage />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/analytics/division" element={<DivisionAnalyticsPage />} />
        <Route path="/ai/chat/admin" element={<AdminChatbotPage />} />
        <Route path="/ai/what-if" element={<WhatIfEnginePage />} />

        {/* SUPER ADMIN */}
        <Route path="/superadmin" element={<SuperAdminDashboardPage />} />
        <Route path="/analytics/school" element={<SchoolAnalyticsPage />} />
        <Route path="/governance/modules" element={<AIModuleStatePage />} />
        <Route path="/governance/overrides" element={<AIOverrideLogPage />} />
        <Route path="/governance/incidents" element={<AIIncidentsPage />} />
        <Route path="/governance/calibration" element={<AICalibrationRunsPage />} />
        <Route path="/governance/monitoring" element={<AIMonitoringSnapshotsPage />} />
        <Route path="/ai/chat/superadmin" element={<SuperAdminChatbotPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
