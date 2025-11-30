import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Divider,
  Alert,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { alpha } from '@mui/material/styles';

const TeacherDashboardPage: React.FC = () => {
  const theme = useTheme();

  // MOCK DATA
  const atRiskStudents = [
    { id: 's1', name: 'John Carter', course: 'Algebra I', risk: 'High' },
    { id: 's2', name: 'Emily Stone', course: 'Biology', risk: 'Medium' },
  ];

  const teacherCourses = [
    { id: 'c1', name: 'Algebra I', students: 24 },
    { id: 'c2', name: 'Biology', students: 18 },
  ];

  const actionAlerts = [
    {
      id: 'a1',
      type: 'warning',
      message: '2 assignments are approaching their grading deadline.',
    },
    {
      id: 'a2',
      type: 'info',
      message: 'A new analytics report is available for Algebra I.',
    },
  ];

  const todaysSchedule = [
    { time: '08:00 AM', event: 'Algebra I – Period 1' },
    { time: '10:15 AM', event: 'Biology – Period 3' },
    { time: '01:30 PM', event: 'Office Hours' },
  ];

  const riskColor: Record<string, 'error' | 'warning' | 'success' | 'default'> = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
  };

  return (
    <>
      <PageHeader
        title="Teacher Dashboard"
        subtitle="Monitor class health, address priorities, and stay organized for the day."
      />

      <Grid container spacing={3}>

        {/* ================================
            ACTION ALERTS
        =================================*/}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Action Alerts</Typography>
              <Stack spacing={1.25}>
                {actionAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    severity={alert.type as any}
                    sx={{
                      borderRadius: 2,
                      '& .MuiAlert-message': { fontWeight: 500 },
                    }}
                  >
                    {alert.message}
                  </Alert>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ================================
            TODAY'S SCHEDULE
        =================================*/}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Today’s Schedule</Typography>
              <Stack spacing={1.25}>
                {todaysSchedule.map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      borderRadius: 2,
                      p: 1.5,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.paper,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      {s.time}
                    </Typography>
                    <Typography variant="body1">{s.event}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ================================
            AT-RISK STUDENTS
        =================================*/}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    At-Risk Students
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
                    Quickly review students who may need intervention based on performance signals.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={`${atRiskStudents.length} flagged`}
                  color="error"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider />

              <Stack spacing={1.25}>
                {atRiskStudents.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.paper,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all .15s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.light, 0.08),
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap>
                        {s.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {s.course} • {s.risk} risk
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Chip
                        size="small"
                        label={`${s.risk} risk`}
                        color={riskColor[s.risk] ?? 'default'}
                        variant="outlined"
                      />
                      <Button
                        component={RouterLink}
                        to={`/analytics/student/${s.id}`}
                        size="small"
                        variant="contained"
                      >
                        View analytics
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ================================
            TEACHER COURSES
        =================================*/}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Your Courses
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
                    Manage your active classes and quickly jump into each course's workspace.
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={`${teacherCourses.length} courses`}
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider />

              <Stack spacing={1.25}>
                {teacherCourses.map((c) => (
                  <Box
                    key={c.id}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.paper,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all .15s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.light, 0.08),
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap>
                        {c.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {c.students} students
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      variant="outlined"
                      component={RouterLink}
                      to={`/lms/courses/${c.id}`}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Open course
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>
  );
};

export default TeacherDashboardPage;
