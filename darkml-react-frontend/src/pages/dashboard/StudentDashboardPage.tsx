import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import GridMUI from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';

const GridItem = GridMUI;

const StudentDashboardPage: React.FC = () => {
  const theme = useTheme();

  // MOCK data for now
  const recentlyAccessedCourses = [
    { id: 'c1', name: 'Algebra I', teacher: 'Ms. Smith' },
    { id: 'c2', name: 'Biology', teacher: 'Dr. Brown' },
    { id: 'c3', name: 'World History', teacher: 'Mr. Lee' },
  ];

  const upcomingAssessments = [
    {
      id: 'a1',
      title: 'Algebra Quiz 3',
      course: 'Algebra I',
      dueDate: '2025-11-26',
    },
    {
      id: 'a2',
      title: 'Biology Lab Report',
      course: 'Biology',
      dueDate: '2025-11-28',
    },
  ];

  const currentAssessments = [
    {
      id: 'a3',
      title: 'History Essay',
      course: 'World History',
      dueDate: '2025-11-24',
    },
  ];

  const recentAnnouncements = [
    {
      id: 'an1',
      course: 'Algebra I',
      title: 'Quiz 3 postponed to Thursday',
      date: '2025-11-22',
    },
    {
      id: 'an2',
      course: 'Biology',
      title: 'Field trip permission forms due',
      date: '2025-11-21',
    },
  ];

  const borderColor = theme.palette.divider;
  const softPrimary = alpha(theme.palette.primary.main, 0.08);
  const softWarning = alpha(theme.palette.warning.main, 0.08);
  const softSuccess = alpha(theme.palette.success.main, 0.08);

  return (
    <Box>
      <PageHeader
        title="Student Dashboard"
        subtitle="Your personalized overview of courses, assessments, and announcements."
      />

      <GridMUI container spacing={3}>
        <GridItem item xs={12} md={4}>
          <StatCard
            label="Recently Accessed Courses"
            value={recentlyAccessedCourses.length}
            helperText="Based on your latest activity"
                        sx={{ borderRadius: 2 }}

          />
        </GridItem>
        <GridItem item xs={12} md={4}>
          <StatCard
            label="Upcoming Assessments"
            value={upcomingAssessments.length}
            helperText="Due in the next few days"             sx={{ borderRadius: 2 }}

          />
        </GridItem>
        <GridItem item xs={12} md={4}>
          <StatCard
            label="Current Assessments"
            value={currentAssessments.length}
            helperText="In progress or due today"             sx={{ borderRadius: 2 }}

          />
        </GridItem>

        {/* ---------------------------------------- */}
        {/* Recently Accessed Courses */}
        {/* ---------------------------------------- */}
        <GridItem item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Recently Accessed Courses
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 360 }}
                  >
                    Jump back into what you were working on most recently.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={`${recentlyAccessedCourses.length} courses`}
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {recentlyAccessedCourses.map((course) => (
                  <Box
                    key={course.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      px: 1.5,
                      py: 1.1,
                      borderRadius: 2,
                      border: `1px solid ${borderColor}`,
                      backgroundColor: theme.palette.background.paper,
                      transition: '160ms ease',
                      '&:hover': {
                        backgroundColor: softPrimary,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap fontWeight={500}>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {course.teacher}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      variant="outlined"
                      component={RouterLink}
                      to={`/lms/student/courses/${course.id}`}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Open course
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </GridItem>

        {/* ---------------------------------------- */}
        {/* Recent Announcements */}
        {/* ---------------------------------------- */}
        <GridItem item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Recent Announcements
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 360 }}
                  >
                    Stay on top of important updates from your teachers.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label="Unread-focused"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {recentAnnouncements.map((ann, index) => {
                  const isHighlighted = index === 0;

                  return (
                    <Box
                      key={ann.id}
                      sx={{
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isHighlighted
                          ? softPrimary
                          : theme.palette.background.paper,
                        transition: '160ms ease',
                        '&:hover': {
                          backgroundColor: softPrimary,
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 0.3, fontWeight: 500 }}
                      >
                        {ann.course}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, color: 'text.primary' }}
                      >
                        {ann.title}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {ann.date}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </GridItem>

        {/* ---------------------------------------- */}
        {/* Upcoming Assessments */}
        {/* ---------------------------------------- */}
        <GridItem item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Upcoming Assessments
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 360 }}
                  >
                    Plan ahead and avoid last-minute surprises.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label="Next up"
                  color="warning"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {upcomingAssessments.map((a) => (
                  <Box
                    key={a.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      px: 1.5,
                      py: 1.1,
                      borderRadius: 2,
                      border: `1px solid ${borderColor}`,
                      backgroundColor: theme.palette.background.paper,
                      transition: '160ms ease',
                      '&:hover': {
                        backgroundColor: softWarning,
                        borderColor: theme.palette.warning.main,
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap fontWeight={500}>
                        {a.title}
                      </Typography>

                      <Typography variant="body2" noWrap color="text.secondary">
                        {a.course} • Due {a.dueDate}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/lms/assessments/${a.id}/take`}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Go to assessment
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </GridItem>

        {/* ---------------------------------------- */}
        {/* Current Assessments */}
        {/* ---------------------------------------- */}
        <GridItem item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Current Assessments
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 360 }}
                  >
                    Pick up where you left off and finish strong.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={
                    currentAssessments.length === 0
                      ? 'Nothing active'
                      : `${currentAssessments.length} active`
                  }
                  color={
                    currentAssessments.length === 0 ? 'default' : 'success'
                  }
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              {currentAssessments.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No assessments currently in progress.
                </Typography>
              )}

              {currentAssessments.length > 0 && (
                <Stack spacing={1.25}>
                  {currentAssessments.map((a) => (
                    <Box
                      key={a.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: theme.palette.background.paper,
                        transition: '160ms ease',
                        '&:hover': {
                          backgroundColor: softSuccess,
                          borderColor: theme.palette.success.main,
                        },
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap fontWeight={500}>
                          {a.title}
                        </Typography>

                        <Typography variant="body2" noWrap color="text.secondary">
                          {a.course} • Due {a.dueDate}
                        </Typography>
                      </Box>

                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        component={RouterLink}
                        to={`/lms/assessments/${a.id}/take`}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Continue
                      </Button>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </GridItem>
      </GridMUI>
    </Box>
  );
};

export default StudentDashboardPage;
