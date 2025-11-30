import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Divider,
  useTheme,
  alpha,
  CircularProgress,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import {
  useAcknowledgeAnnouncement,
  useAcknowledgeFeedback,
  useAttendanceUpdate,
  useEnrollmentUpdate,
} from '../../hooks/useLmsMutations';
import { useToast } from '../../hooks/useToast';

const StudentCourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();
  const { showToast, toast } = useToast();

  const announcementAck = useAcknowledgeAnnouncement();
  const feedbackAck = useAcknowledgeFeedback();
  const attendanceUpdate = useAttendanceUpdate();
  const enrollmentUpdate = useEnrollmentUpdate();

  const [announcementLoadingId, setAnnouncementLoadingId] = React.useState<string | null>(null);
  const [feedbackLoadingId, setFeedbackLoadingId] = React.useState<string | null>(null);
  const [attendanceLoadingId, setAttendanceLoadingId] = React.useState<string | null>(null);
  const [enrollmentLoading, setEnrollmentLoading] = React.useState<
    'DROP' | 'ENROLL' | 'SYNC_TO_CALENDAR' | null
  >(null);

  const [isEnrolled, setIsEnrolled] = React.useState(true);
  const [calendarSynced, setCalendarSynced] = React.useState(false);

  const courseName = `Course ${courseId || ''}`;

  const [announcements, setAnnouncements] = React.useState(
    (
      [
        { id: 'an1', title: 'Welcome to the course', date: '2025-11-20' },
        { id: 'an2', title: 'Homework due Friday', date: '2025-11-22' },
      ] as Array<{ id: string; title: string; date: string; acknowledged?: boolean }>
    ).map((ann) => ({ ...ann, acknowledged: false }))
  );

  const [grades, setGrades] = React.useState(
    (
      [
        { assessment: 'Quiz 1', score: '18/20' },
        { assessment: 'Assignment 1', score: '9/10' },
      ] as Array<{ assessment: string; score: string; acknowledged?: boolean }>
    ).map((grade) => ({ ...grade, acknowledged: false }))
  );

  const [assessments] = React.useState(
    [
      { id: 'a1', title: 'Quiz 2', status: 'UPCOMING', dueDate: '2025-11-26' },
      { id: 'a2', title: 'Project 1', status: 'IN_PROGRESS', dueDate: '2025-11-30' },
    ] as Array<{ id: string; title: string; status: string; dueDate: string; synced?: boolean }>
  );

  const [attendance, setAttendance] = React.useState(
    [
      { id: 'att1', date: '2025-11-18', status: 'PRESENT' },
      { id: 'att2', date: '2025-11-19', status: 'PRESENT' },
      { id: 'att3', date: '2025-11-20', status: 'ABSENT' },
    ] satisfies Array<{ id: string; date: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }>
  );

  const borderColor = theme.palette.divider;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const statusChipColor = (status: string): 'default' | 'primary' | 'success' | 'warning' => {
    switch (status) {
      case 'UPCOMING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleAcknowledgeAnnouncement = (announcementId: string) => {
    const previous = [...announcements];
    setAnnouncementLoadingId(announcementId);
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === announcementId ? { ...ann, acknowledged: true } : ann))
    );

    announcementAck.mutate(
      { announcementId, studentId: 'student-123' },
      {
        onSuccess: () => showToast('Announcement acknowledged.', 'success'),
        onError: () => {
          setAnnouncements(previous);
          showToast('Could not acknowledge announcement.', 'error');
        },
        onSettled: () => setAnnouncementLoadingId(null),
      }
    );
  };

  const handleAcknowledgeFeedback = (assessmentName: string) => {
    const previous = [...grades];
    setFeedbackLoadingId(assessmentName);
    setGrades((prev) =>
      prev.map((grade) =>
        grade.assessment === assessmentName ? { ...grade, acknowledged: true } : grade
      )
    );

    feedbackAck.mutate(
      { assessmentId: assessmentName, studentId: 'student-123' },
      {
        onSuccess: () => showToast('Feedback acknowledged.', 'success'),
        onError: () => {
          setGrades(previous);
          showToast('Unable to acknowledge feedback.', 'error');
        },
        onSettled: () => setFeedbackLoadingId(null),
      }
    );
  };

  const handleAttendanceStatus = (attendanceId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    const previous = [...attendance];
    setAttendanceLoadingId(attendanceId);
    setAttendance((prev) =>
      prev.map((row) => (row.id === attendanceId ? { ...row, status } : row))
    );

    attendanceUpdate.mutate(
      { attendanceId, status },
      {
        onSuccess: () => showToast('Attendance updated.', 'success'),
        onError: () => {
          setAttendance(previous);
          showToast('Could not update attendance.', 'error');
        },
        onSettled: () => setAttendanceLoadingId(null),
      }
    );
  };

  const handleEnrollmentChange = (action: 'DROP' | 'ENROLL' | 'SYNC_TO_CALENDAR') => {
    const previousEnrolled = isEnrolled;
    const previousSynced = calendarSynced;
    setEnrollmentLoading(action);
    if (action === 'DROP') setIsEnrolled(false);
    if (action === 'ENROLL') setIsEnrolled(true);
    if (action === 'SYNC_TO_CALENDAR') setCalendarSynced(true);

    enrollmentUpdate.mutate(
      { courseId: courseId ?? 'course-1', studentId: 'student-123', action },
      {
        onSuccess: () => {
          const message =
            action === 'DROP'
              ? 'Course dropped.'
              : action === 'ENROLL'
              ? 'Re-enrolled successfully.'
              : 'Synced to your calendar.';
          showToast(message, 'success');
        },
        onError: () => {
          setIsEnrolled(previousEnrolled);
          setCalendarSynced(previousSynced);
          showToast('Could not update course enrollment.', 'error');
        },
        onSettled: () => setEnrollmentLoading(null),
      }
    );
  };

  return (
    <Box>
      <PageHeader
        title={courseName}
        subtitle="Student-facing view of this course: announcements, grades, and progress."
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              disabled={enrollmentLoading === 'SYNC_TO_CALENDAR' || calendarSynced}
              onClick={() => handleEnrollmentChange('SYNC_TO_CALENDAR')}
              startIcon={
                enrollmentLoading === 'SYNC_TO_CALENDAR' ? (
                  <CircularProgress color="inherit" size={16} />
                ) : undefined
              }
            >
              {calendarSynced ? 'Synced' : 'Sync to calendar'}
            </Button>
            <Button
              variant="contained"
              size="small"
              color={isEnrolled ? 'error' : 'primary'}
              disabled={enrollmentLoading === 'DROP' || enrollmentLoading === 'ENROLL'}
              onClick={() => handleEnrollmentChange(isEnrolled ? 'DROP' : 'ENROLL')}
              startIcon={
                enrollmentLoading === 'DROP' || enrollmentLoading === 'ENROLL' ? (
                  <CircularProgress color="inherit" size={16} />
                ) : undefined
              }
            >
              {isEnrolled ? 'Drop course' : 'Re-enroll'}
            </Button>
          </Stack>
        }
      />

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

      {tab === 0 && (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Announcements
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Course updates and reminders from your teacher.
                </Typography>
              </Box>
              <Chip size="small" label={`${announcements.length} posts`} variant="outlined" color="primary" />
            </Box>

            <Divider sx={{ borderColor }} />

            <List dense disablePadding>
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
                    secondary={ann.date}
                  />
                  <Stack direction="row" spacing={1} alignItems="center">
                    {ann.acknowledged && <Chip size="small" color="success" label="Acknowledged" />}
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={ann.acknowledged || announcementLoadingId === ann.id}
                      onClick={() => handleAcknowledgeAnnouncement(ann.id)}
                      startIcon={
                        announcementLoadingId === ann.id ? (
                          <CircularProgress color="inherit" size={14} />
                        ) : undefined
                      }
                    >
                      {announcementLoadingId === ann.id ? 'Saving...' : 'Acknowledge'}
                    </Button>
                  </Stack>
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
              {grades.map((g) => (
                <ListItem
                  key={g.assessment}
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
                    primary={g.assessment}
                    secondary={`Score: ${g.score}`}
                  />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip size="small" label={g.score} variant="outlined" color="success" />
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      disabled={g.acknowledged || feedbackLoadingId === g.assessment}
                      onClick={() => handleAcknowledgeFeedback(g.assessment)}
                      startIcon={
                        feedbackLoadingId === g.assessment ? (
                          <CircularProgress color="inherit" size={14} />
                        ) : undefined
                      }
                    >
                      {g.acknowledged ? 'Acknowledged' : 'Confirm feedback'}
                    </Button>
                  </Stack>
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
                    <Button size="small" component={RouterLink} to={`/lms/assessments/${a.id}/take`} variant="contained">
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
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={attendanceLoadingId === row.id || row.status === 'PRESENT'}
                    onClick={() => handleAttendanceStatus(row.id, 'PRESENT')}
                    startIcon={
                      attendanceLoadingId === row.id ? (
                        <CircularProgress color="inherit" size={14} />
                      ) : undefined
                    }
                  >
                    {row.status === 'PRESENT' ? 'Synced' : 'Sync attendance'}
                  </Button>
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
      {toast}
    </Box>
  );
};

export default StudentCourseDetailPage;
