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
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../../components/common/PageHeader';
import { useMyCoursesQuery } from '../../api/lmsCourses';
import type { LmsCourse } from '../../types/lms';

const PAGE_SIZE = 8;

const MyCoursesPage: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const queryParams = React.useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      search: search.trim() || undefined,
    }),
    [page, search],
  );

  const { data, isLoading, isFetching, isError } = useMyCoursesQuery(queryParams);

  const courses = React.useMemo<LmsCourse[]>(
    () => data?.items ?? [],
    [data],
  );

  const totalPages = React.useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1),
    [data],
  );

  const borderColor = theme.palette.divider;
  const softSuccess = alpha(theme.palette.success.main, 0.18);

  return (
    <>
      <PageHeader
        title="My Courses"
        subtitle="All courses you are currently enrolled in, across subjects and divisions."
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder="Search courses"
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
          We couldn&apos;t load your courses from the backend. Please try again shortly.
        </Alert>
      )}

      {isLoading ? (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Fetching courses…
          </Typography>
        </Stack>
      ) : courses.length === 0 ? (
        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No courses match the current filters.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course, index) => (
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
                        Teacher: {course.teacherName}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={course.code}
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
                      {course.enrollmentStatus === 'COMPLETED'
                        ? 'Completed'
                        : 'Enrolled • Active course'}
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

export default MyCoursesPage;
