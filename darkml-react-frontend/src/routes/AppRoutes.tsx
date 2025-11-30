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
        <Route
          path="/student"
          element={<ProtectedRoute roles={['STUDENT']}><StudentDashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/lms/my-courses"
          element={<ProtectedRoute roles={['STUDENT']}><MyCoursesPage /></ProtectedRoute>}
        />
        <Route
          path="/lms/student/courses/:courseId"
          element={
            <ProtectedRoute roles={['STUDENT']}>
              <StudentCourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/assessments"
          element={<ProtectedRoute roles={['STUDENT']}><AssessmentsPage /></ProtectedRoute>}
        />
        <Route
          path="/lms/assessments/:assessmentId/take"
          element={
            <ProtectedRoute roles={['STUDENT']}>
              <StudentTakeAssessmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/attendance"
          element={<ProtectedRoute roles={['STUDENT']}><AttendancePage /></ProtectedRoute>}
        />
        <Route
          path="/lms/participation"
          element={<ProtectedRoute roles={['STUDENT']}><ParticipationPage /></ProtectedRoute>}
        />
        <Route
          path="/lms/student-profile"
          element={<ProtectedRoute roles={['STUDENT']}><StudentProfilePage /></ProtectedRoute>}
        />
        <Route
          path="/analytics/student"
          element={<ProtectedRoute roles={['STUDENT']}><StudentAnalyticsPage /></ProtectedRoute>}
        />
        <Route
          path="/student/practice"
          element={<ProtectedRoute roles={['STUDENT']}><PracticeAndLearnPage /></ProtectedRoute>}
        />
        <Route
          path="/ai/chat/student"
          element={<ProtectedRoute roles={['STUDENT']}><StudentChatbotPage /></ProtectedRoute>}
        />

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <TeacherDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/courses"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/courses/:courseId"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/courses/:courseId/gradebook"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <GradebookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/teacher-attendance"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <TeacherAttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/teacher-participation"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <TeacherParticipationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/assessments/:assessmentId"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <AssessmentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/class"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <ClassAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/chat/teacher"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <TeacherChatbotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/questions"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <QuestionGeneratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/grading"
          element={
            <ProtectedRoute roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}>
              <AIGradingPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/division"
          element={
            <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
              <DivisionAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/chat/admin"
          element={
            <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
              <AdminChatbotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/what-if"
          element={
            <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']}>
              <WhatIfEnginePage />
            </ProtectedRoute>
          }
        />

        {/* SUPER ADMIN */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <SuperAdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/school"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <SchoolAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/governance/modules"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <AIModuleStatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/governance/overrides"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <AIOverrideLogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/governance/incidents"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <AIIncidentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/governance/calibration"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <AICalibrationRunsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/governance/monitoring"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <AIMonitoringSnapshotsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/chat/superadmin"
          element={
            <ProtectedRoute roles={['SUPER_ADMIN']}>
              <SuperAdminChatbotPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
