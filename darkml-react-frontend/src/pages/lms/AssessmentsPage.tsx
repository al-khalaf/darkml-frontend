import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
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

type AssessmentSection = 'upcoming' | 'current' | 'past';

type AssessmentItem = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: AssessmentSection;
  score?: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAssessments: AssessmentItem[] = [
  {
    id: 'a1',
    title: 'Algebra Quiz 3',
    course: 'Algebra I',
    dueDate: '2025-11-26',
    status: 'upcoming',
  },
  {
    id: 'a2',
    title: 'History Essay',
    course: 'World History',
    dueDate: '2025-11-24',
    status: 'current',
  },
  {
    id: 'a3',
    title: 'Biology Quiz 1',
    course: 'Biology',
    dueDate: '2025-11-10',
    status: 'past',
    score: '18/20',
  },
];

const fetchAssessments = async (section: AssessmentSection) => {
  await delay(500);

  return mockAssessments.filter((assessment) => assessment.status === section);
};

const AssessmentsPage: React.FC = () => {
  const theme = useTheme();
  const upcomingQuery = useQuery({
    queryKey: ['assessments', 'upcoming'],
    queryFn: () => fetchAssessments('upcoming'),
    staleTime: 60 * 1000,
  });

  const currentQuery = useQuery({
    queryKey: ['assessments', 'current'],
    queryFn: () => fetchAssessments('current'),
    staleTime: 60 * 1000,
  });

  const pastQuery = useQuery({
    queryKey: ['assessments', 'past'],
    queryFn: () => fetchAssessments('past'),
    staleTime: 60 * 1000,
  });

  const borderColor = theme.palette.divider;
  const softWarning = alpha(theme.palette.warning.main, 0.12);
  const softSuccess = alpha(theme.palette.success.main, 0.12);
  const softPrimary = alpha(theme.palette.primary.main, 0.08);

  return (
    <>
      <PageHeader
        title="Assessments"
        subtitle="Track upcoming, in-progress, and completed assessments across all your courses."
      />

      <Grid container spacing={3}>
        {/* Upcoming */}
        <Grid item xs={12} md={4}>
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
                    Upcoming
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 320 }}
                  >
                    Assessments that are scheduled but haven&apos;t started yet.
                  </Typography>
                </Box>
                {upcomingQuery.isLoading ? (
                  <Skeleton variant="rounded" width={110} height={28} />
                ) : (
                  <Chip
                    size="small"
                    label={`${upcomingQuery.data?.length ?? 0} scheduled`}
                    color="warning"
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                )}
              </Box>

              <Divider sx={{ borderColor }} />

              {upcomingQuery.isError && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  action={
                    <Button color="inherit" size="small" onClick={() => upcomingQuery.refetch()}>
                      Retry
                    </Button>
                  }
                >
                  Upcoming assessments could not be loaded.
                </Alert>
              )}

              {upcomingQuery.isLoading && (
                <Stack spacing={1.25}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Box key={`upcoming-skeleton-${index}`}>
                      <Skeleton variant="text" width="75%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  ))}
                </Stack>
              )}

              {!upcomingQuery.isLoading && !upcomingQuery.isError && (
                <>
                  {(upcomingQuery.data?.length ?? 0) === 0 && (
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        No upcoming assessments.
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        The backend filters returned no scheduled work. Check again later or reload.
                      </Typography>
                      <Button size="small" variant="outlined" onClick={() => upcomingQuery.refetch()}>
                        Refresh
                      </Button>
                    </Box>
                  )}

                  {(upcomingQuery.data?.length ?? 0) > 0 && (
                    <Stack spacing={1.25}>
                      {upcomingQuery.data?.map((a) => (
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
                            Go
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Current */}
        <Grid item xs={12} md={4}>
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
                    Current
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 320 }}
                  >
                    Assessments you&apos;ve started or that are due very soon.
                  </Typography>
                </Box>
                {currentQuery.isLoading ? (
                  <Skeleton variant="rounded" width={110} height={28} />
                ) : (
                  <Chip
                    size="small"
                    label={`${currentQuery.data?.length ?? 0} active`}
                    color="success"
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                )}
              </Box>

              <Divider sx={{ borderColor }} />

              {currentQuery.isError && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  action={
                    <Button color="inherit" size="small" onClick={() => currentQuery.refetch()}>
                      Retry
                    </Button>
                  }
                >
                  We couldn&apos;t load active assessments.
                </Alert>
              )}

              {currentQuery.isLoading && (
                <Stack spacing={1.25}>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Box key={`current-skeleton-${index}`}>
                      <Skeleton variant="text" width="78%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  ))}
                </Stack>
              )}

              {!currentQuery.isLoading && !currentQuery.isError && (
                <>
                  {(currentQuery.data?.length ?? 0) === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No active assessments right now.
                    </Typography>
                  )}

                  {(currentQuery.data?.length ?? 0) > 0 && (
                    <Stack spacing={1.25}>
                      {currentQuery.data?.map((a) => (
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
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Past */}
        <Grid item xs={12} md={4}>
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
                    Past
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 320 }}
                  >
                    Completed assessments and their final scores.
                  </Typography>
                </Box>
                {pastQuery.isLoading ? (
                  <Skeleton variant="rounded" width={120} height={28} />
                ) : (
                  <Chip
                    size="small"
                    label={`${pastQuery.data?.length ?? 0} completed`}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                )}
              </Box>

              <Divider sx={{ borderColor }} />

              {pastQuery.isError && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  action={
                    <Button color="inherit" size="small" onClick={() => pastQuery.refetch()}>
                      Retry
                    </Button>
                  }
                >
                  Past results are unavailable right now.
                </Alert>
              )}

              {pastQuery.isLoading && (
                <Stack spacing={1.25}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Box key={`past-skeleton-${index}`}>
                      <Skeleton variant="text" width="80%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  ))}
                </Stack>
              )}

              {!pastQuery.isLoading && !pastQuery.isError && (
                <>
                  {(pastQuery.data?.length ?? 0) === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No completed assessments available yet.
                    </Typography>
                  )}

                  {(pastQuery.data?.length ?? 0) > 0 && (
                    <Stack spacing={1.25}>
                      {pastQuery.data?.map((a) => (
                        <Box
                          key={a.id}
                          sx={{
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
                          <Typography variant="subtitle1" noWrap fontWeight={500}>
                            {a.title}
                          </Typography>
                          <Typography variant="body2" noWrap color="text.secondary">
                            {a.course} • Score {a.score}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AssessmentsPage;
