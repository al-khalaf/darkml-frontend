import React from 'react';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const AssessmentsPage: React.FC = () => {
  const theme = useTheme();

  const upcoming = [
    {
      id: 'a1',
      title: 'Algebra Quiz 3',
      course: 'Algebra I',
      dueDate: '2025-11-26',
      estimated: '25 mins',
      attempts: '0 of 1',
      rubric: 'Accuracy, reasoning',
    },
    {
      id: 'a4',
      title: 'Geography Map Quiz',
      course: 'Geography',
      dueDate: '2025-11-23',
      estimated: '20 mins',
      attempts: '0 of 2',
      rubric: 'Recall, map labeling',
    },
  ];

  const current = [
    {
      id: 'a2',
      title: 'History Essay',
      course: 'World History',
      dueDate: '2025-11-24',
      estimated: '3-4 hrs',
      attempts: 'Draft saved',
      rubric: 'Thesis, evidence, citations',
      progress: 40,
    },
    {
      id: 'a5',
      title: 'Physics Lab 2',
      course: 'Physics',
      dueDate: '2025-11-25',
      estimated: '90 mins',
      attempts: 'Not started',
      rubric: 'Procedure, results, reflection',
      progress: 10,
    },
  ];

  const past = [
    {
      id: 'a3',
      title: 'Biology Quiz 1',
      course: 'Biology',
      score: '18/20',
      feedback: 'Review mitosis diagrams',
    },
  ];

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

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Calendar & workload
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Add due dates to your calendar and balance your week.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip size="small" color="primary" variant="outlined" label="Sync to calendar" />
                <Chip size="small" variant="outlined" label="Generate study plan" />
                <Chip size="small" variant="outlined" label="Reminders on" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Quick stats
              </Typography>
              <Stack spacing={0.8}>
                <Typography variant="body2">2 upcoming this week</Typography>
                <Typography variant="body2">1 active draft</Typography>
                <Typography variant="body2">Feedback ready for 1 item</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Suggested focus
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Finish the History essay draft and schedule 45 minutes for Quiz 3 review.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
                <Chip
                  size="small"
                  label={`${upcoming.length} scheduled`}
                  color="warning"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {upcoming.map((a) => (
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
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip size="small" variant="outlined" label={`Estimated ${a.estimated}`} />
                        <Chip size="small" variant="outlined" label={a.rubric} />
                        <Chip size="small" variant="outlined" label={`Attempts ${a.attempts}`} />
                      </Stack>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/lms/assessments/${a.id}/take`}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Preview
                    </Button>
                  </Box>
                ))}
              </Stack>
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
                <Chip
                  size="small"
                  label={`${current.length} active`}
                  color="success"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {current.map((a) => (
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
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Typography variant="subtitle1" noWrap fontWeight={500}>
                        {a.title}
                      </Typography>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {a.course} • Due {a.dueDate}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip size="small" variant="outlined" label={`Estimated ${a.estimated}`} />
                        <Chip size="small" variant="outlined" label={a.rubric} />
                        <Chip size="small" variant="outlined" label={`Status: ${a.attempts}`} />
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={a.progress}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 999 }}
                        />
                        <Typography variant="body2" sx={{ minWidth: 42, fontWeight: 600 }}>
                          {a.progress}%
                        </Typography>
                      </Stack>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/lms/assessments/${a.id}/take`}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Resume
                    </Button>
                  </Box>
                ))}
              </Stack>
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
                    Recently graded work with quick access to feedback and rubric.
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={`${past.length} graded`}
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor }} />

              <Stack spacing={1.25}>
                {past.map((a) => (
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
                        backgroundColor: softPrimary,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap fontWeight={500}>
                        {a.title}
                      </Typography>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {a.course}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip size="small" variant="outlined" label={`Score ${a.score}`} />
                        <Chip size="small" variant="outlined" label={a.feedback} />
                      </Stack>
                    </Box>
                    <Button size="small" variant="outlined" component={RouterLink} to={`/lms/assessments/${a.id}`}>
                      View
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

export default AssessmentsPage;
