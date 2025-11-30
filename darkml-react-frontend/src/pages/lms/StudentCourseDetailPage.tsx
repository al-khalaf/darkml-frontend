import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import { useStudentCourseDetailQuery } from '../../api/lmsCourseDetail';
import type {
  AssessmentStatus,
  AssessmentSummary,
  AttendanceRecord,
  CourseAnnouncement,
  CourseGradeItem,
} from '../../types/lms';

const StudentCourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();

  const { data, isLoading, isFetching, isError } = useStudentCourseDetailQuery(courseId);

  const courseName = data?.course?.name || `Course ${courseId || ''}`;
  const borderColor = theme.palette.divider;

  const announcements = React.useMemo<CourseAnnouncement[]>(
    () => data?.announcements ?? [],
    [data],
  );

  const grades = React.useMemo<CourseGradeItem[]>(() => data?.grades ?? [], [data]);

  const assessments = React.useMemo<AssessmentSummary[]>(
    () => data?.assessments ?? [],
    [data],
  );

  const attendance = React.useMemo<AttendanceRecord[]>(
    () => data?.attendance ?? [],
    [data],
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const statusChipColor = (status: AssessmentStatus): 'default' | 'primary' | 'success' | 'warning' => {
    switch (status) {
      case 'UPCOMING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'success';
      case 'COMPLETED':
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <PageHeader
        title={courseName}
        subtitle="Student-facing view of this course: announcements, grades, and progress."
      />

      {isFetching && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, color: 'text.secondary' }}>
          <CircularProgress size={16} thickness={4} />
          <Typography variant="caption">Refreshing course data…</Typography>
        </Stack>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          We couldn&apos;t load this course from the backend. Please try again shortly.
        </Alert>
      )}

      <Card
        variant="outlined"
        sx={{
          mb: 3,
          borderRadius: 999,
          px: 1.5,
          py: 0.5,
          backgroundColor: theme.palette.background.paper,
          borderColor,
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 44,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 999,
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiTab-root': {
              minHeight: 40,
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: 'text.secondary',
              paddingInline: 14,
              paddingBlock: 6,
              borderRadius: 999,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            },
          }}
        >
          <Tab label="Announcements" />
          <Tab label="Grades" />
          <Tab label="Assessments" />
          <Tab label="Attendance" />
          <Tab label="Analytics" />
        </Tabs>
      </Card>

      {isLoading ? (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CircularProgress size={20} thickness={4} />
            <Typography variant="body2" color="text.secondary">
              Loading course experience…
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          {tab === 0 && (
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Announcements
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                      Course updates, reminders, and instructor posts.
                    </Typography>
                  </Box>
                  <Chip size="small" label={`${announcements.length} posts`} variant="outlined" />
                </Box>

                <Divider sx={{ borderColor }} />

                <List dense disablePadding>
                  {announcements.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1.5 }}>
                      No announcements yet for this course.
                    </Typography>
                  )}
                  {announcements.map((ann) => (
                    <ListItem
                      key={ann.id}
                      disableGutters
                      sx={{
                        mb: 1.1,
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: theme.palette.background.paper,
                        transition: '160ms ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'subtitle1', sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                        primary={ann.title}
                        secondary={ann.postedAt}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {tab === 1 && (
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Grades
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                      Snapshot of your scored work in this course.
                    </Typography>
                  </Box>
                  <Chip size="small" label={`${grades.length} graded items`} variant="outlined" />
                </Box>

                <Divider sx={{ borderColor }} />

                <List dense disablePadding>
                  {grades.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1.5 }}>
                      No graded work to display yet.
                    </Typography>
                  )}
                  {grades.map((g) => (
                    <ListItem
                      key={g.assessmentId}
                      disableGutters
                      sx={{
                        mb: 1.1,
                        px: 1.5,
                        py: 1.05,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: theme.palette.background.paper,
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'subtitle1', sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                        primary={g.assessmentTitle}
                        secondary={`Score: ${g.score}/${g.maxScore}`}
                      />
                      <Chip
                        size="small"
                        label={g.status.replace('_', ' ')}
                        variant="outlined"
                        color={statusChipColor(g.status)}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {tab === 2 && (
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Assessments
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                      Upcoming and in-progress work for this course.
                    </Typography>
                  </Box>
                  <Chip size="small" label={`${assessments.length} items`} variant="outlined" color="primary" />
                </Box>

                <Divider sx={{ borderColor }} />

                <Stack spacing={1.25}>
                  {assessments.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Nothing scheduled right now.
                    </Typography>
                  )}
                  {assessments.map((a) => (
                    <Box
                      key={a.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: theme.palette.background.paper,
                        transition: '160ms ease',
                        '&:hover': {
                          backgroundColor:
                            a.status === 'IN_PROGRESS'
                              ? alpha(theme.palette.success.main, 0.12)
                              : alpha(theme.palette.warning.main, 0.12),
                          borderColor:
                            a.status === 'IN_PROGRESS'
                              ? theme.palette.success.main
                              : theme.palette.warning.main,
                        },
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap fontWeight={500}>
                          {a.title}
                        </Typography>
                        <Typography variant="body2" noWrap color="text.secondary">
                          {a.status} • Due {a.dueDate}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Chip
                          size="small"
                          label={a.status.replace('_', ' ')}
                          color={statusChipColor(a.status)}
                          variant="outlined"
                        />
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/lms/assessments/${a.id}/take`}
                          variant="contained"
                        >
                          Go to assessment
                        </Button>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {tab === 3 && (
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Attendance for this course
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                      Session-by-session attendance log for this specific course.
                    </Typography>
                  </Box>
                  <Chip size="small" label={`${attendance.length} records`} variant="outlined" />
                </Box>

                <Divider sx={{ borderColor }} />

                <List dense disablePadding>
                  {attendance.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1.5 }}>
                      No attendance records yet.
                    </Typography>
                  )}
                  {attendance.map((row) => (
                    <ListItem
                      key={row.id}
                      disableGutters
                      sx={{
                        mb: 1.1,
                        px: 1.5,
                        py: 1.05,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor:
                          row.status === 'ABSENT'
                            ? alpha(theme.palette.error.main, 0.12)
                            : theme.palette.background.paper,
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'subtitle1', sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                        primary={row.date}
                        secondary={row.status}
                      />
                      <Chip
                        size="small"
                        label={row.status}
                        color={
                          row.status === 'PRESENT'
                            ? 'success'
                            : row.status === 'ABSENT'
                            ? 'error'
                            : 'warning'
                        }
                        variant="outlined"
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {tab === 4 && (
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Course Analytics
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 560 }}>
                  Placeholder: this view will surface course-specific analytics for you in this class –
                  performance trends, mastery by topic, and risk indicators – once the backend analytics APIs are connected.
                </Typography>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default StudentCourseDetailPage;
