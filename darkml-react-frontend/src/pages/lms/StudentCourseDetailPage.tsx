import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
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

const StudentCourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();

  const courseName = `Course ${courseId || ''}`;

  const announcements = [
    {
      id: 'an1',
      title: 'Welcome to the course',
      date: '2025-11-20',
      pinned: true,
      attachments: ['Syllabus.pdf'],
      type: 'Update',
    },
    {
      id: 'an2',
      title: 'Homework due Friday',
      date: '2025-11-22',
      pinned: false,
      attachments: ['Homework_1.pdf', 'Rubric.docx'],
      type: 'Reminder',
    },
    {
      id: 'an3',
      title: 'Live Q&A Thursday 5pm',
      date: '2025-11-23',
      pinned: false,
      attachments: [],
      type: 'Live session',
    },
  ];

  const grades = [
    { assessment: 'Quiz 1', score: 90, weight: '10%', feedback: 'Good start' },
    { assessment: 'Assignment 1', score: 85, weight: '15%', feedback: 'Expand analysis' },
    { assessment: 'Lab 1', score: 92, weight: '10%', feedback: 'Great visuals' },
  ];

  const assessments = [
    {
      id: 'a1',
      title: 'Quiz 2',
      status: 'UPCOMING',
      dueDate: '2025-11-26',
      estimated: '20 mins',
      attempts: '0 of 1',
      rubric: 'Accuracy, process',
    },
    {
      id: 'a2',
      title: 'Project 1',
      status: 'IN_PROGRESS',
      dueDate: '2025-11-30',
      estimated: '4-6 hrs',
      attempts: 'Draft submitted',
      rubric: 'Research depth, clarity, visuals',
    },
    {
      id: 'a3',
      title: 'Reflection 1',
      status: 'SUBMITTED',
      dueDate: '2025-11-18',
      estimated: '30 mins',
      attempts: '1 of 2',
      rubric: 'Reflection depth',
    },
  ];

  const attendance = [
    { date: '2025-11-18', status: 'Present' },
    { date: '2025-11-19', status: 'Present' },
    { date: '2025-11-20', status: 'Absent' },
    { date: '2025-11-21', status: 'Present' },
  ];

  const modulePlan = [
    {
      title: 'Module 1: Foundations',
      duration: 'Weeks 1-2',
      lessons: [
        {
          title: 'Variables & Expressions',
          resources: ['Slides: Intro to variables', 'Worksheet 1', 'Practice problems set A'],
        },
        {
          title: 'Order of Operations',
          resources: ['Video: PEMDAS refresher', 'Checkpoint quiz'],
        },
      ],
    },
    {
      title: 'Module 2: Linear Equations',
      duration: 'Weeks 3-4',
      lessons: [
        {
          title: 'Solving one-step equations',
          resources: ['Guided notes PDF', 'Formative assessment'],
        },
        {
          title: 'Graphing lines',
          resources: ['Desmos activity link', 'Lab: Slope exploration'],
        },
      ],
    },
  ];

  const resources = [
    { name: 'Course syllabus', type: 'PDF', size: '480 KB' },
    { name: 'Formula sheet', type: 'PDF', size: '120 KB' },
    { name: 'Video library playlist', type: 'Link', size: '12 videos' },
    { name: 'Sample lab report', type: 'DOCX', size: '220 KB' },
  ];

  const pacing = [
    { label: 'Overall progress', value: 68 },
    { label: 'Assignments submitted', value: 72 },
    { label: 'Mastery toward target', value: 64 },
  ];

  const discussionHighlights = [
    { title: 'Week 4 Q&A thread', replies: 14, updated: '2h ago' },
    { title: 'Project 1 peer review', replies: 9, updated: '1d ago' },
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const statusChipColor = (
    status: string
  ): 'default' | 'primary' | 'success' | 'warning' | 'info' => {
    switch (status) {
      case 'UPCOMING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'success';
      case 'SUBMITTED':
        return 'info';
      default:
        return 'default';
    }
  };

  const borderColor = theme.palette.divider;

  return (
    <Box>
      <PageHeader
        title={courseName}
        subtitle="Student-facing view of this course: announcements, content, grades, and progress."
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="h6">Course overview</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Quick pulse of where you are in the syllabus.
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LinearProgress variant="determinate" value={68} sx={{ flexGrow: 1, height: 8, borderRadius: 999 }} />
                  <Typography variant="body2" fontWeight={600}>
                    68%
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip size="small" color="primary" variant="outlined" label="Next: Quiz 2 · Nov 26" />
                  <Chip size="small" variant="outlined" label="Weekly classes: M/W/F" />
                  <Chip size="small" variant="outlined" label="3 credits" />
                </Stack>
              </Stack>
              <Divider sx={{ borderColor }} />
              <Stack spacing={0.75}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Suggested focus
                </Typography>
                <Typography variant="subtitle2">Finish Module 2 readings and draft Project 1.</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <Typography variant="h6">Pacing & mastery</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Track completion, submissions, and your mastery trajectory.
              </Typography>
              <Stack spacing={1.25}>
                {pacing.map((item) => (
                  <Box key={item.label}>
                    <Stack direction="row" justifyContent="space-between" mb={0.3}>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {item.value}%
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={item.value} sx={{ height: 8, borderRadius: 999 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6">Engagement</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Stay connected with announcements, discussions, and office hours.
              </Typography>
              <Stack spacing={1}>
                <Chip size="small" color="secondary" label={`${announcements.length} announcements`} />
                <Stack spacing={0.8}>
                  {discussionHighlights.map((d) => (
                    <Stack
                      key={d.title}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" noWrap>
                        {d.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {d.replies} replies · {d.updated}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="contained" component={RouterLink} to="#">
                    Open discussions
                  </Button>
                  <Button size="small" variant="outlined" component={RouterLink} to="#" sx={{ textTransform: 'none' }}>
                    Office hours
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          <Tab label="Grades & Feedback" />
          <Tab label="Assessments" />
          <Tab label="Attendance" />
          <Tab label="Analytics" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={7}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      Announcements
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                      Course updates, reminders, and live session notices from your teacher.
                    </Typography>
                  </Box>
                  <Chip size="small" label={`${announcements.length} posts`} variant="outlined" color="primary" />
                </Stack>

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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 0.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center" width="100%">
                        <Chip size="small" label={ann.type} variant="outlined" />
                        {ann.pinned && <Chip size="small" color="secondary" label="Pinned" />}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {ann.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {ann.date}
                        </Typography>
                      </Stack>
                      {ann.attachments.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {ann.attachments.map((file) => (
                            <Chip key={file} size="small" variant="outlined" label={file} />
                          ))}
                        </Stack>
                      )}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                <Typography variant="h6">Course materials</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Downloadable syllabus, reference sheets, and media for this course.
                </Typography>
                <List dense disablePadding>
                  {resources.map((res) => (
                    <ListItem
                      key={res.name}
                      disableGutters
                      sx={{
                        px: 1.25,
                        py: 1,
                        mb: 1,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <ListItemText primary={res.name} secondary={`${res.type} • ${res.size}`} />
                      <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                        Open
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Weekly modules & lessons</Typography>
                  <Chip size="small" variant="outlined" label={`${modulePlan.length} modules`} />
                </Stack>
                <Grid container spacing={2}>
                  {modulePlan.map((module) => (
                    <Grid item xs={12} md={6} key={module.title}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1" fontWeight={600}>
                              {module.title}
                            </Typography>
                            <Chip size="small" label={module.duration} variant="outlined" />
                          </Stack>
                          <Stack spacing={1}>
                            {module.lessons.map((lesson) => (
                              <Box
                                key={lesson.title}
                                sx={{
                                  p: 1.2,
                                  borderRadius: 2,
                                  border: `1px solid ${borderColor}`,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                }}
                              >
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {lesson.title}
                                </Typography>
                                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                                  {lesson.resources.map((res) => (
                                    <Chip key={res} size="small" variant="outlined" label={res} />
                                  ))}
                                </Stack>
                              </Box>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Grades & feedback
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Snapshot of your scored work with weighting and teacher notes.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Chip size="small" label="Weighted grade: 88%" color="success" />
                <Chip size="small" variant="outlined" label="Mastery: 64%" />
              </Stack>
            </Stack>

            <Divider sx={{ borderColor }} />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={7}>
                <List dense disablePadding>
                  {grades.map((g, idx) => (
                    <ListItem
                      key={idx}
                      disableGutters
                      sx={{
                        mb: 1.1,
                        px: 1.5,
                        py: 1.05,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: theme.palette.background.paper,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'subtitle1', sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                        primary={g.assessment}
                        secondary={`Weight ${g.weight}`}
                      />
                      <Chip size="small" color="primary" label={`${g.score}%`} sx={{ mr: 1 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 160 }}>
                        {g.feedback}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={5}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Progress toward mastery
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Topics trending down: Linear equations, word problems. Practice sets recommended.
                    </Typography>
                    <Stack spacing={1}>
                      {[
                        { label: 'Procedural fluency', value: 62 },
                        { label: 'Conceptual understanding', value: 69 },
                        { label: 'Application & transfer', value: 58 },
                      ].map((item) => (
                        <Box key={item.label}>
                          <Stack direction="row" justifyContent="space-between" mb={0.3}>
                            <Typography variant="body2">{item.label}</Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.value}%
                            </Typography>
                          </Stack>
                          <LinearProgress variant="determinate" value={item.value} sx={{ height: 8, borderRadius: 999 }} />
                        </Box>
                      ))}
                    </Stack>
                    <Button size="small" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                      View rubric details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Assessments & submissions
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Know what is due, what you have submitted, and how many attempts remain.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip size="small" variant="outlined" label="Calendar sync available" />
                <Chip size="small" color="primary" label="Show rubric" />
              </Stack>
            </Stack>

            <Divider sx={{ borderColor }} />

            <Grid container spacing={2.5}>
              {assessments.map((a) => (
                <Grid item xs={12} md={4} key={a.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      borderColor,
                      backgroundColor: a.status === 'IN_PROGRESS' ? alpha(theme.palette.success.main, 0.03) : undefined,
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="subtitle1" fontWeight={600}>
                          {a.title}
                        </Typography>
                        <Chip size="small" label={a.status.replace('_', ' ')} color={statusChipColor(a.status)} />
                      </Stack>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Due {a.dueDate} • Estimated {a.estimated}
                      </Typography>
                      <Stack spacing={0.75}>
                        <Chip size="small" variant="outlined" label={`Attempts: ${a.attempts}`} />
                        <Chip size="small" variant="outlined" label={`Rubric: ${a.rubric}`} />
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          component={RouterLink}
                          to={`/lms/assessments/${a.id}/take`}
                          sx={{ textTransform: 'none' }}
                        >
                          {a.status === 'IN_PROGRESS' ? 'Resume attempt' : 'Start'}
                        </Button>
                        <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                          View details
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Attendance
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Marked attendance by date, including absent/late flags for the term.
                </Typography>
              </Box>
              <Chip size="small" label={`Records: ${attendance.length}`} variant="outlined" />
            </Stack>

            <Divider sx={{ borderColor }} />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <List dense disablePadding>
                  {attendance.map((record) => (
                    <ListItem
                      key={record.date}
                      disableGutters
                      sx={{
                        mb: 1,
                        px: 1.25,
                        py: 1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'subtitle1', sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                        primary={record.date}
                        secondary="Class session"
                      />
                      <Chip size="small" color={record.status === 'Present' ? 'success' : 'warning'} label={record.status} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Attendance insights
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Present 75% of sessions • 1 absence • 0 tardies this month. Keep above 90% to
                      stay in good standing.
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip size="small" variant="outlined" label="Notify teacher" />
                      <Chip size="small" variant="outlined" label="Request make-up" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 4 && (
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Analytics & pacing
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Personalized indicators to understand where to focus next.
                </Typography>
              </Box>
              <Chip size="small" variant="outlined" label="Beta" />
            </Stack>

            <Divider sx={{ borderColor }} />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Topic mastery snapshot
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Strengths: Fractions & ratios, quadratic functions. Focus: Algebraic expressions,
                      word problems.
                    </Typography>
                    <Stack spacing={0.8}>
                      {[{ topic: 'Algebraic expressions', value: 54 }, { topic: 'Linear equations', value: 71 }, { topic: 'Word problems', value: 59 }].map((item) => (
                        <Box key={item.topic}>
                          <Stack direction="row" justifyContent="space-between" mb={0.25}>
                            <Typography variant="body2">{item.topic}</Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.value}%
                            </Typography>
                          </Stack>
                          <LinearProgress variant="determinate" value={item.value} sx={{ height: 8, borderRadius: 999 }} />
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Workload & pacing guidance
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Current workload is medium. Allocate ~4 hours this week to Project 1 and 45
                      minutes to Quiz 2 review.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip size="small" color="primary" variant="outlined" label="Generate study plan" />
                      <Chip size="small" variant="outlined" label="Add to calendar" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default StudentCourseDetailPage;
