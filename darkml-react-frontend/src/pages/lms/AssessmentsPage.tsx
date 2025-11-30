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
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const AssessmentsPage: React.FC = () => {
  const theme = useTheme();

  const upcoming = [
    { id: 'a1', title: 'Algebra Quiz 3', course: 'Algebra I', dueDate: '2025-11-26' },
  ];

  const current = [
    { id: 'a2', title: 'History Essay', course: 'World History', dueDate: '2025-11-24' },
  ];

  const past = [
    { id: 'a3', title: 'Biology Quiz 1', course: 'Biology', score: '18/20' },
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
                <Chip
                  size="small"
                  label={`${past.length} completed`}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AssessmentsPage;
