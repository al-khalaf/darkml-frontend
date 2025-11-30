import React from 'react';
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../../components/common/PageHeader';
import { useStudentAssessmentsQuery } from '../../api/lmsAssessments';
import type { AssessmentStatus, AssessmentSummary } from '../../types/lms';

const PAGE_SIZE = 6;
const STATUS_TABS: (AssessmentStatus | 'ALL')[] = ['ALL', 'UPCOMING', 'IN_PROGRESS', 'COMPLETED'];

const AssessmentsPage: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState<AssessmentStatus | 'ALL'>('ALL');
  const [search, setSearch] = React.useState('');

  const queryParams = React.useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      status: status === 'ALL' ? undefined : status,
      search: search.trim() || undefined,
    }),
    [page, search, status],
  );

  const { data, isLoading, isFetching, isError } = useStudentAssessmentsQuery(queryParams);

  const assessments = React.useMemo<AssessmentSummary[]>(
    () => data?.items ?? [],
    [data],
  );

  const upcoming = React.useMemo(
    () => assessments.filter((a) => a.status === 'UPCOMING'),
    [assessments],
  );

  const current = React.useMemo(
    () => assessments.filter((a) => a.status === 'IN_PROGRESS'),
    [assessments],
  );

  const past = React.useMemo(
    () => assessments.filter((a) => a.status === 'COMPLETED'),
    [assessments],
  );

  const totalPages = React.useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1),
    [data],
  );

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

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Tabs
          value={status}
          onChange={(_, value) => {
            setStatus(value as AssessmentStatus | 'ALL');
            setPage(1);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 42, '& .MuiTab-root': { textTransform: 'none' } }}
        >
          {STATUS_TABS.map((tab) => (
            <Tab
              key={tab}
              label={tab === 'ALL' ? 'All' : tab.replace('_', ' ')}
              value={tab}
            />
          ))}
        </Tabs>

        <TextField
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search assessments"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 240 }}
        />

        {isFetching && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
            <CircularProgress size={18} thickness={4} />
            <Typography variant="body2">Refreshing…</Typography>
          </Stack>
        )}
      </Stack>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to fetch assessments from the backend. Showing current client results.
        </Alert>
      )}

      {isLoading ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Loading assessments…
        </Typography>
      ) : assessments.length === 0 ? (
        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No assessments found for the selected filters.
          </Typography>
        </Card>
      ) : (
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
                  {upcoming.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Nothing scheduled.
                    </Typography>
                  )}
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
                          Due {a.dueDate}
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
                  {current.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Nothing in progress.
                    </Typography>
                  )}
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
                          Due {a.dueDate}
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
                  {past.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No completed assessments in this view.
                    </Typography>
                  )}
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
                        Completed on {a.dueDate}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default AssessmentsPage;
