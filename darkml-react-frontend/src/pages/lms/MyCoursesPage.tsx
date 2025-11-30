import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
  alpha,
  Skeleton,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchMyCourses = async () => {
  await delay(450);

  return [
    { id: 'c1', name: 'Algebra I', teacher: 'Ms. Smith' },
    { id: 'c2', name: 'Biology', teacher: 'Dr. Brown' },
    { id: 'c3', name: 'World History', teacher: 'Mr. Lee' },
    { id: 'c4', name: 'English Literature', teacher: 'Ms. Johnson' },
    { id: 'c5', name: 'Physics', teacher: 'Dr. Chen' },
    { id: 'c6', name: 'Computer Science', teacher: 'Mr. Patel' },
    { id: 'c7', name: 'Art', teacher: 'Ms. Garcia' },
    { id: 'c8', name: 'Physical Education', teacher: 'Coach Davis' },
    { id: 'c9', name: 'Music', teacher: 'Mr. Martinez' },
    { id: 'c10', name: 'Geography', teacher: 'Ms. Adams' },
  ];
};

const MyCoursesPage: React.FC = () => {
  const theme = useTheme();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-courses'],
    queryFn: fetchMyCourses,
    staleTime: 60 * 1000,
  });

  const borderColor = theme.palette.divider;
  const softSuccess = alpha(theme.palette.success.main, 0.18);
  const courses = data ?? [];

  return (
    <>
      <PageHeader
        title="My Courses"
        subtitle="All courses you are currently enrolled in, across subjects and divisions."
      />

      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 2.5 }}
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          We couldn&apos;t load your courses. Please try again.
        </Alert>
      )}

      {!isLoading && !isError && courses.length === 0 && (
        <Card
          variant="outlined"
          sx={{ mb: 3, borderColor, backgroundColor: alpha(theme.palette.info.main, 0.04) }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              No courses matched your current filters
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              The backend returned no enrollments for this term. Adjust your filters or refresh to
              try again.
            </Typography>
            <Button size="small" variant="outlined" onClick={() => refetch()}>
              Refresh courses
            </Button>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Grid item key={`skeleton-${index}`} xs={12} sm={6} md={4} lg={3}>
                <Card variant="outlined" sx={{ height: '100%', borderColor }}>
                  <CardContent sx={{ p: 2.4 }}>
                    <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1.5 }} />
                    <Skeleton variant="rectangular" height={32} width="45%" sx={{ borderRadius: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : courses.map((course, index) => (
              <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    borderColor,
                    transition:
                      'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      boxShadow:
                        '0 6px 18px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.75,
                      p: 2.4,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          noWrap
                          sx={{
                            mb: 0.5,
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: 'text.primary',
                          }}
                        >
                          {course.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ color: 'text.secondary' }}
                        >
                          Teacher: {course.teacher}
                        </Typography>
                      </Box>

                      <Chip
                        size="small"
                        label={`#${index + 1}`}
                        variant="outlined"
                        color="primary"
                        sx={{ flexShrink: 0, mt: 0.3 }}
                      />
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 0.5 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '999px',
                          backgroundColor: softSuccess,
                          border: `1px solid ${theme.palette.success.main}`,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Enrolled • Active course
                      </Typography>
                    </Stack>

                    <Box sx={{ mt: 0.5 }}>
                      <Button
                        size="small"
                        component={RouterLink}
                        to={`/lms/student/courses/${course.id}`}
                        variant="outlined"
                        sx={{
                          borderRadius: 999,
                          px: 2.2,
                          textTransform: 'none',
                        }}
                      >
                        View details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default MyCoursesPage;
