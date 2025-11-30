// src/pages/lms/ClassDetailPage.tsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

import theme from '../../theme';
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Chip,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import BarChartCard from '../../components/charts/BarChartCard';
import LineChartCard from '../../components/charts/LineChartCard';
import PieChartCard from '../../components/charts/PieChartCard';

const ClassDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tab, setTab] = React.useState(0);

  const mockAnnouncements = [
    { id: 'a1', title: 'Welcome to the course!', date: '2025-11-22' },
    { id: 'a2', title: 'Quiz on Friday', date: '2025-11-24' },
  ];

  const mockStudents = [
    { id: 's1', name: 'John Carter' },
    { id: 's2', name: 'Emily Stone' },
    { id: 's3', name: 'Liam Walker' },
    { id: 's4', name: 'Sophia Chen' },
  ];

  const mockAssessments = [
    { id: 'as1', title: 'Quiz 1' },
    { id: 'as2', title: 'Project 1' },
  ];

  // --- Gradebook mock data ---
  const mockGradebookRows = [
    {
      studentId: 's1',
      student: 'John Carter',
      quiz1: 86,
      project1: 93,
      exam1: 81,
      overall: 87,
      mastery: 79,
    },
    {
      studentId: 's2',
      student: 'Emily Stone',
      quiz1: 92,
      project1: 95,
      exam1: 89,
      overall: 92,
      mastery: 88,
    },
    {
      studentId: 's3',
      student: 'Liam Walker',
      quiz1: 74,
      project1: 81,
      exam1: 69,
      overall: 76,
      mastery: 65,
    },
    {
      studentId: 's4',
      student: 'Sophia Chen',
      quiz1: 81,
      project1: 88,
      exam1: 84,
      overall: 84,
      mastery: 80,
    },
  ];

  // --- Attendance mock data ---
  const mockAttendanceRecords = [
    { date: '2025-11-20', present: 24, absent: 2, late: 1 },
    { date: '2025-11-21', present: 23, absent: 3, late: 1 },
    { date: '2025-11-22', present: 25, absent: 1, late: 0 },
    { date: '2025-11-23', present: 22, absent: 4, late: 2 },
  ];

  // --- Participation state ---
  type ParticipationLevel = 'Low' | 'Medium' | 'High';

  const [participationLevels, setParticipationLevels] = React.useState<
    Record<string, ParticipationLevel>
  >(
    () =>
      mockStudents.reduce(
        (acc, s) => ({ ...acc, [s.id]: 'Medium' as ParticipationLevel }),
        {} as Record<string, ParticipationLevel>
      )
  );

  const handleParticipationChange = (
    studentId: string,
    value: ParticipationLevel
  ) => {
    setParticipationLevels((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // --- Analytics mock data ---

  // Overall class summary KPIs
  const classSummary = {
    averageClassScore: 86,
    averageMasteryScore: 78,
    highRiskPercent: 18,
    attendanceRate: 93,
    participationAverage: 'Medium-High',
    lateSubmissionRate: 12,
  };

  // Score trends
  const scoreTrendQuiz = [
    { label: 'Week 1', value: 78 },
    { label: 'Week 2', value: 82 },
    { label: 'Week 3', value: 84 },
    { label: 'Week 4', value: 87 },
  ];

  const scoreTrendAssignments = [
    { label: 'Week 1', value: 80 },
    { label: 'Week 2', value: 83 },
    { label: 'Week 3', value: 86 },
    { label: 'Week 4', value: 89 },
  ];

  const scoreTrendExams = [
    { label: 'Term 1', value: 81 },
    { label: 'Term 2', value: 84 },
    { label: 'Term 3', value: 88 },
  ];

  // Grade distribution histogram
  const gradeDistributionData = [
    { bucket: '90–100', count: 6 },
    { bucket: '80–89', count: 10 },
    { bucket: '70–79', count: 5 },
    { bucket: '60–69', count: 3 },
    { bucket: '<60', count: 2 },
  ];

  // Missing & late submissions
  const missingLateSubmissionsData = [
    { status: 'Missing', value: 8 },
    { status: 'Late', value: 14 },
  ];

  // Topic mastery summary
  const topicMasterySummary = [
    { topic: 'Algebraic Expressions', avgMastery: 54, level: 'Low', trend: 'down' },
    { topic: 'Linear Equations', avgMastery: 71, level: 'Medium', trend: 'flat' },
    { topic: 'Quadratic Functions', avgMastery: 63, level: 'Medium', trend: 'up' },
    { topic: 'Fractions & Ratios', avgMastery: 82, level: 'High', trend: 'up' },
    { topic: 'Word Problems', avgMastery: 59, level: 'Low', trend: 'down' },
  ];

  const strongTopics = ['Fractions & Ratios', 'Quadratic Functions', 'Linear Equations'];
  const weakTopics = ['Algebraic Expressions', 'Word Problems', 'Linear Equations'];

  // Difficulty performance
  const difficultyPerformanceData = [
    { difficulty: 'Easy', accuracy: 92 },
    { difficulty: 'Moderate', accuracy: 79 },
    { difficulty: 'Hard', accuracy: 61 },
    { difficulty: 'Extreme', accuracy: 38 },
  ];

  // Topic accuracy
  const topicAccuracyData = topicMasterySummary.map((t) => ({
    topic: t.topic,
    accuracy: t.avgMastery,
  }));

  const mostMissedQuestionTypes = [
    { type: 'Multi-step MCQ', count: 32 },
    { type: 'Short Answer', count: 21 },
    { type: 'Open Response', count: 15 },
  ];

  const mostFailedDifficulties = ['Hard word problems', 'Extreme algebra proofs'];

  // Risk distribution
  const riskDistributionPie = [
    { label: 'Low', value: 18 },
    { label: 'Medium', value: 6 },
    { label: 'High', value: 4 },
  ];

  // Behavior trends
  const behaviorTrendLateSubmissions = [
    { label: 'Week 1', value: 18 },
    { label: 'Week 2', value: 15 },
    { label: 'Week 3', value: 13 },
    { label: 'Week 4', value: 11 },
  ];

  const behaviorTrendCompletion = [
    { label: 'Week 1', value: 82 },
    { label: 'Week 2', value: 85 },
    { label: 'Week 3', value: 88 },
    { label: 'Week 4', value: 90 },
  ];

  // Predictions
  const predictedFinalGradesDistribution = [
    { bucket: 'A', count: 7 },
    { bucket: 'B', count: 10 },
    { bucket: 'C', count: 5 },
    { bucket: 'D/F', count: 3 },
  ];

  const atRiskPredictions = [
    {
      student: 'John Carter',
      risk: 'High',
      weakTopics: ['Algebraic Expressions', 'Word Problems'],
      lastMasteryDrop: '2025-11-18',
    },
    {
      student: 'Liam Walker',
      risk: 'Medium',
      weakTopics: ['Quadratic Functions'],
      lastMasteryDrop: '2025-11-21',
    },
  ];

  const upcomingWeakTopicPredictions = [
    { topic: 'Systems of Equations', reason: 'Low baseline mastery in algebra' },
    { topic: 'Inequalities', reason: 'Similar pattern to weak linear topics' },
  ];

  // Intervention suggestions
  const interventionStudents = [
    {
      student: 'John Carter',
      riskLevel: 'High',
      weakTopics: ['Algebraic Expressions', 'Word Problems'],
      suggestedIntervention: '1:1 reteach session + targeted practice set',
      lastMasteryDrop: '2025-11-18',
    },
    {
      student: 'Liam Walker',
      riskLevel: 'Medium',
      weakTopics: ['Quadratic Functions'],
      suggestedIntervention: 'Small-group review workshop',
      lastMasteryDrop: '2025-11-21',
    },
  ];

  const smallGroupRecommendations = [
    {
      label: 'Group 1 – Fractions & Ratios',
      pattern: 'Difficulty HARD accuracy < 40%',
    },
    {
      label: 'Group 2 – Algebra Word Problems',
      pattern: 'Consistent Low mastery + High lateness',
    },
  ];

  const teachingActions = [
    'Re-teach Algebraic Expressions — class mastery 54% (low)',
    'Assign practice on Fractions — difficulty HARD accuracy 32%',
    'Follow up with 3 students with dropping mastery trends',
  ];

  const handleTab = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  const masteryColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'rgba(34,197,94,0.16)';
      case 'Medium':
        return 'rgba(250,204,21,0.12)';
      case 'Low':
        return 'rgba(248,113,113,0.16)';
      default:
        return 'rgba(148,163,184,0.08)';
    }
  };

  const trendSymbol = (trend: string) => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  // ⭐ NEW: flag to treat Analytics tab specially for layout
  const isAnalyticsTab = tab === 5;

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        // ⭐ CHANGED: analytics can go full-width, others stay at 1440
        maxWidth: isAnalyticsTab ? '100%' : 1440,
        mx: 'auto',
        px: { xs: 1.25, sm: 2, md: 3 },
        pb: { xs: 5, md: 7 },
        boxSizing: 'border-box',
        // ⭐ EXTRA SAFETY: kill random horizontal scroll on small screens
        overflowX: 'hidden',
      }}
    >
      <PageHeader
        title={`Course ${courseId}`}
        subtitle="Teacher workspace for announcements, gradebook, attendance, and analytics."
      />

      {/* TABS NAV BAR */}
      <Card
        variant="outlined"
        sx={{
          mb: 2.5,
          borderRadius: 24,
          px: 0, // important: no extra horizontal padding around Tabs
          py: { xs: 0.5, sm: 0.75 },
          background: theme.palette.background.paper,
          width: '100%',
          borderColor: alpha(theme.palette.divider, 0.8),
          // ⭐ helps prevent weird overflow on very small devices
          overflowX: 'auto',
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTab}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Class detail sections"
          sx={{
            width: '100%',
            minWidth: 0,
            minHeight: 36,
            overflowX: 'auto',
            '& .MuiTabs-scroller': {
              overflowX: 'auto !important',
            },
            '& .MuiTabs-flexContainer': {
              gap: 0.25,
              justifyContent: { xs: 'flex-start', md: 'center' },
              minWidth: 'fit-content',
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 999,
              backgroundImage: 'linear-gradient(90deg, #4F46E5, #6366F1, #22C55E)',
              boxShadow: `0 0 10px ${alpha('#818CF8', 0.4)}`,
            },
            '& .MuiTab-root': {
              flexShrink: 0,
              minHeight: 34,
              paddingInline: { xs: 10, sm: 12 },
              paddingBlock: 4,
              fontSize: { xs: 12, sm: 13 },
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 500,
              color: theme.palette.text.secondary,
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                color: theme.palette.primary.contrastText,
                backgroundColor: alpha(theme.palette.primary.dark, 0.85),
                boxShadow: `0 8px 18px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            },
          }}
        >
          <Tab label="Announcements" />
          <Tab label="Gradebook" />
          <Tab label="Attendance" />
          <Tab label="Students" />
          <Tab label="Participation" />
          <Tab label="Analytics" />
          <Tab label="Assessments" />
        </Tabs>
      </Card>

      {/* ANNOUNCEMENTS TAB */}
      {tab === 0 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Announcements
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 420 }}
                >
                  Course broadcast messages and time-sensitive updates for students.
                </Typography>
              </Box>
              <Chip
                size="small"
                label={`${mockAnnouncements.length} posts`}
                color="primary"
                variant="outlined"
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 0.5 }} />

            <List dense disablePadding>
              {mockAnnouncements.map((ann) => (
                <ListItem
                  key={ann.id}
                  disableGutters
                  sx={{
                    mb: 1.1,
                    px: { xs: 1.25, sm: 1.5 },
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: '#FFFFFF',
                    transition:
                      'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      boxShadow: '0 10px 30px rgba(15,23,42,0.18)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 12px rgba(15,23,42,0.18)',
                    },
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      sx: { fontWeight: 500, fontSize: { xs: 13, sm: 14 } },
                    }}
                    secondaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: 'text.secondary', fontSize: { xs: 11.5, sm: 12 } },
                    }}
                    primary={ann.title}
                    secondary={ann.date}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* GRADEBOOK TAB */}
      {tab === 1 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Gradebook
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 520 }}
                >
                  Per-assessment scores and mastery metrics for each student.
                </Typography>
              </Box>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/lms/courses/${courseId}/gradebook`}
                sx={{ mt: { xs: 0, sm: 1 }, whiteSpace: 'nowrap' }}
              >
                Open full gradebook
              </Button>
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 1 }} />

            <Box
              sx={{
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                overflowX: 'auto',
                background: '#FFFFFF',
                width: '100%',
              }}
            >
              <Table
                size="small"
                sx={{
                  width: '100%',
                  minWidth: 0,
                  tableLayout: 'auto',
                  '& th, & td': {
                    whiteSpace: { xs: 'nowrap', md: 'normal' },
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Student
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Quiz 1
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Project 1
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Exam 1
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Overall
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Mastery
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockGradebookRows.map((row) => (
                    <TableRow
                      key={row.studentId}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                        },
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        },
                      }}
                    >
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.student}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.quiz1}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.project1}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.exam1}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 500 }}
                      >
                        {row.overall}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.mastery}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* ATTENDANCE TAB */}
      {tab === 2 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Attendance
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 520 }}
                >
                  Daily attendance summary for this course.
                </Typography>
              </Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/lms/teacher-attendance"
                sx={{ mt: { xs: 0, sm: 1 }, whiteSpace: 'nowrap' }}
              >
                Mark attendance
              </Button>
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 1 }} />

            <Box
              sx={{
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                overflowX: 'auto',
                backgroundColor: '#FFFFFF',
                width: '100%',
              }}
            >
              <Table
                size="small"
                sx={{
                  width: '100%',
                  minWidth: 0,
                  tableLayout: 'auto',
                  '& th, & td': {
                    whiteSpace: { xs: 'nowrap', md: 'normal' },
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Present
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Absent
                    </TableCell>
                    <TableCell
                      sx={{ color: 'text.secondary', fontSize: { xs: 11, sm: 12 } }}
                    >
                      Late
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAttendanceRecords.map((row) => (
                    <TableRow
                      key={row.date}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                        },
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.success.main, 0.16),
                        },
                      }}
                    >
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.date}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.present}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.absent}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                        {row.late}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* STUDENTS TAB */}
      {tab === 3 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Students
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 520 }}
                >
                  Roster of learners currently enrolled in this course.
                </Typography>
              </Box>
              <Chip
                size="small"
                label={`${mockStudents.length} enrolled`}
                variant="outlined"
                color="primary"
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 0.5 }} />

            <List dense disablePadding>
              {mockStudents.map((s) => (
                <ListItem
                  key={s.id}
                  disableGutters
                  sx={{
                    mb: 1.1,
                    px: { xs: 1.25, sm: 1.5 },
                    py: 1.05,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: '#FFFFFF',
                    transition:
                      'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      boxShadow: '0 10px 30px rgba(15,23,42,0.18)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 12px rgba(15,23,42,0.18)',
                    },
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      sx: { fontWeight: 500, fontSize: { xs: 13, sm: 14 } },
                    }}
                    primary={s.name}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* PARTICIPATION TAB */}
      {tab === 4 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Participation
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 520 }}
                >
                  Qualitative engagement level for each student (Low / Medium / High).
                </Typography>
              </Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/lms/teacher-participation"
                sx={{
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                  whiteSpace: 'nowrap',
                }}
              >
                Open participation log
              </Button>
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 0.5 }} />

            <Stack spacing={1.1}>
              {mockStudents.map((s) => (
                <Box
                  key={s.id}
                  sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 1.25,
                    flexWrap: 'wrap',
                    minWidth: 0,
                    px: { xs: 1.25, sm: 1.5 },
                    py: 1.05,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: '#FFFFFF',
                    transition:
                      'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      boxShadow: '0 10px 30px rgba(15,23,42,0.18)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 12px rgba(15,23,42,0.18)',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      flex: 1,
                      minWidth: 0,
                      fontSize: { xs: 13, sm: 14 },
                    }}
                  >
                    {s.name}
                  </Typography>
                  <FormControl
                    size="small"
                    sx={{
                      minWidth: { xs: '100%', sm: 160 },
                    }}
                  >
                    <Select
                      value={participationLevels[s.id] ?? 'Medium'}
                      onChange={(e) =>
                        handleParticipationChange(
                          s.id,
                          e.target.value as ParticipationLevel
                        )
                      }
                      fullWidth
                      sx={{
                        fontSize: 13,
                        '& .MuiSelect-select': {
                          py: 0.9,
                        },
                        '& fieldset': {
                          borderRadius: 999,
                        },
                        '& .MuiSelect-icon': {
                          color: '#475569',
                        },
                      }}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ANALYTICS TAB */}
      {tab === 5 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            {/* 1️⃣ Overall Class Summary */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                minWidth: 0,
              }}
            >
              <Typography variant="h6">Course Analytics</Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 560 }}
              >
                High-level health indicators, mastery trends, risk profiles, and
                AI-powered intervention suggestions for this class.
              </Typography>
            </Box>

            <Grid container spacing={1.75} sx={{ width: '100%', m: 0 }}>
              {[
                {
                  label: 'Average Class Score',
                  value: `${classSummary.averageClassScore}%`,
                  color: 'rgba(191,219,254,0.9)',
                },
                {
                  label: 'Average Mastery Score',
                  value: `${classSummary.averageMasteryScore}%`,
                  color: 'rgba(209,250,229,0.9)',
                },
                {
                  label: 'High-Risk Students',
                  value: `${classSummary.highRiskPercent}%`,
                  color: 'rgba(254,226,226,0.9)',
                },
                {
                  label: 'Attendance Rate',
                  value: `${classSummary.attendanceRate}%`,
                  color: 'rgba(191,219,254,0.9)',
                },
                {
                  label: 'Participation Average',
                  value: classSummary.participationAverage,
                  color: 'rgba(224,231,255,0.9)',
                },
                {
                  label: 'Late Submission Rate',
                  value: `${classSummary.lateSubmissionRate}%`,
                  color: 'rgba(254,243,199,0.9)',
                },
              ].map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.label}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <CardContent sx={{ py: 1.75, px: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: card.color,
                          mb: 0.5,
                          display: 'block',
                          fontWeight: 500,
                          letterSpacing: 0.5,
                        }}
                      >
                        {card.label}
                      </Typography>
                      <Typography
                        variant={
                          card.label === 'Participation Average' ? 'h6' : 'h5'
                        }
                        sx={{ fontWeight: 600 }}
                      >
                        {card.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* 2️⃣ Performance Analytics */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Performance Analytics
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                Score trends, grade distributions, and missing/late work patterns
                across quizzes, assignments, and exams.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} sm={6} md={4}>
                <LineChartCard
                  title="Quiz Average Over Time"
                  data={scoreTrendQuiz}
                  xKey="label"
                  yKey="value"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <LineChartCard
                  title="Assignment Average Over Time"
                  data={scoreTrendAssignments}
                  xKey="label"
                  yKey="value"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <LineChartCard
                  title="Exam Average Over Time"
                  data={scoreTrendExams}
                  xKey="label"
                  yKey="value"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BarChartCard
                  title="Grade Distribution"
                  data={gradeDistributionData}
                  xKey="bucket"
                  yKey="count"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BarChartCard
                  title="Missing vs Late Submissions"
                  data={missingLateSubmissionsData}
                  xKey="status"
                  yKey="value"
                />
              </Grid>
            </Grid>

            {/* 3️⃣ Topic Mastery */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Topic Mastery
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                Topic-level mastery scores, trends, and heatmaps to highlight what
                this class truly understands.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} md={7}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Topic Mastery Table
                    </Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                      <Table
                        size="small"
                        sx={{
                          width: '100%',
                          minWidth: 0,
                          tableLayout: 'auto',
                          '& th, & td': {
                            whiteSpace: { xs: 'nowrap', md: 'normal' },
                          },
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: { xs: 11, sm: 12 },
                                color: 'text.secondary',
                              }}
                            >
                              Topic
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: { xs: 11, sm: 12 },
                                color: 'text.secondary',
                              }}
                            >
                              Avg Mastery
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: { xs: 11, sm: 12 },
                                color: 'text.secondary',
                              }}
                            >
                              Level
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: { xs: 11, sm: 12 },
                                color: 'text.secondary',
                              }}
                            >
                              Trend
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topicMasterySummary.map((t) => (
                            <TableRow key={t.topic}>
                              <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                                {t.topic}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                                {t.avgMastery}%
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                                {t.level}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: 12, sm: 13 } }}>
                                {trendSymbol(t.trend)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={5}>
                <Stack spacing={1.5}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, color: 'text.secondary' }}
                      >
                        Topic Mastery Heatmap
                      </Typography>
                      <Stack spacing={0.75}>
                        {topicMasterySummary.map((t) => (
                          <Box
                            key={t.topic}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: 0.5,
                              borderRadius: 1.5,
                              px: 1,
                              py: 0.75,
                              backgroundColor: masteryColor(t.level),
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 12.5, flex: 1, minWidth: 0 }}
                            >
                              {t.topic}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 500,
                                color:
                                  t.level === 'Low'
                                    ? '#fecaca'
                                    : t.level === 'High'
                                    ? '#bbf7d0'
                                    : '#fef3c7',
                              }}
                            >
                              {t.level} ({t.avgMastery}%)
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 0.75, color: 'text.secondary' }}
                      >
                        Top 3 Strong Topics
                      </Typography>
                      <Stack spacing={0.5} sx={{ mb: 1 }}>
                        {strongTopics.map((t) => (
                          <Typography key={t} sx={{ fontSize: 13 }}>
                            • {t}
                          </Typography>
                        ))}
                      </Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 0.75, color: 'text.secondary' }}
                      >
                        Top 3 Weak Topics
                      </Typography>
                      <Stack spacing={0.5}>
                        {weakTopics.map((t) => (
                          <Typography key={t} sx={{ fontSize: 13 }}>
                            • {t}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>

            {/* 4️⃣ Question-Level & Difficulty Analytics */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Question-Level & Difficulty Analytics
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                How students perform by difficulty band, topic accuracy, and question
                type.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} sm={6} md={4}>
                <BarChartCard
                  title="Difficulty Performance"
                  data={difficultyPerformanceData}
                  xKey="difficulty"
                  yKey="accuracy"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <BarChartCard
                  title="Topic Accuracy"
                  data={topicAccuracyData}
                  xKey="topic"
                  yKey="accuracy"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Most Missed Question Types
                    </Typography>
                    <Stack spacing={0.5}>
                      {mostMissedQuestionTypes.map((q) => (
                        <Typography key={q.type} sx={{ fontSize: 13 }}>
                          • {q.type} ({q.count} misses)
                        </Typography>
                      ))}
                    </Stack>
                    <Divider
                      sx={{ my: 1.25, borderColor: 'rgba(148,163,184,0.4)' }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.75, color: 'text.secondary' }}
                    >
                      Most Failed Difficulties
                    </Typography>
                    <Stack spacing={0.5}>
                      {mostFailedDifficulties.map((d) => (
                        <Typography key={d} sx={{ fontSize: 13 }}>
                          • {d}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* 5️⃣ Risk & Behavior Analytics */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Risk & Behavior Analytics
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                Risk distribution and behavioral patterns explaining why students
                struggle.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} md={4}>
                <PieChartCard title="Risk Distribution" data={riskDistributionPie} />
              </Grid>
              <Grid item xs={12} md={4}>
                <LineChartCard
                  title="Late Submission Rate (Last 4 Weeks)"
                  data={behaviorTrendLateSubmissions}
                  xKey="label"
                  yKey="value"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LineChartCard
                  title="Completion Rate (Last 4 Weeks)"
                  data={behaviorTrendCompletion}
                  xKey="label"
                  yKey="value"
                />
              </Grid>
            </Grid>

            {/* 6️⃣ Predictions */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Predictions
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                Predicted final grade distribution and at-risk trajectories based on
                current mastery, behavior, and performance.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} md={4}>
                <BarChartCard
                  title="Predicted Final Grades"
                  data={predictedFinalGradesDistribution}
                  xKey="bucket"
                  yKey="count"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      At-Risk Predictions
                    </Typography>
                    <Stack spacing={0.75}>
                      {atRiskPredictions.map((item) => (
                        <Box key={item.student}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {item.student} — {item.risk} risk
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            Weak topics: {item.weakTopics.join(', ')}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            Last mastery drop: {item.lastMasteryDrop}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Upcoming Weak Topic Predictions
                    </Typography>
                    <Stack spacing={0.75}>
                      {upcomingWeakTopicPredictions.map((t) => (
                        <Box key={t.topic}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {t.topic}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            {t.reason}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* 7️⃣ Intervention Suggestions */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Intervention Suggestions
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 600 }}
              >
                Concrete students, groups, and teaching actions to move this class
                forward.
              </Typography>
            </Box>

            <Grid container spacing={2.25} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} md={5}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Students Needing Attention
                    </Typography>
                    <Stack spacing={1}>
                      {interventionStudents.map((s) => (
                        <Box key={s.student}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {s.student} — {s.riskLevel} risk
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            Weak topics: {s.weakTopics.join(', ')}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            Suggested: {s.suggestedIntervention}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            Last mastery drop: {s.lastMasteryDrop}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3.5}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Small Group Recommendations
                    </Typography>
                    <Stack spacing={0.75}>
                      {smallGroupRecommendations.map((g) => (
                        <Box key={g.label}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            {g.label}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 12, color: 'text.secondary' }}
                          >
                            {g.pattern}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3.5}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      Recommended Teaching Actions
                    </Typography>
                    <Stack spacing={0.75}>
                      {teachingActions.map((a) => (
                        <Typography key={a} sx={{ fontSize: 13 }}>
                          • {a}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ASSESSMENTS TAB */}
      {tab === 6 && (
        <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
              p: { xs: 2, sm: 2.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'baseline' },
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Assessments
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 520 }}
                >
                  Manage quizzes, projects, and exams associated with this course.
                </Typography>
              </Box>
              <Chip
                size="small"
                label={`${mockAssessments.length} items`}
                variant="outlined"
                color="primary"
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 0.5 }} />

            <Stack spacing={1.25}>
              {mockAssessments.map((as) => (
                <Box
                  key={as.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    minWidth: 0,
                    gap: 1.5,
                    px: { xs: 1.25, sm: 1.5 },
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: '#FFFFFF',
                    transition:
                      'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      boxShadow: '0 10px 30px rgba(15,23,42,0.18)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 12px rgba(15,23,42,0.18)',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      flex: 1,
                      minWidth: 0,
                      fontSize: { xs: 13, sm: 14 },
                    }}
                  >
                    {as.title}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/lms/assessments/${as.id}`}
                    size="small"
                    variant="outlined"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Open
                  </Button>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ClassDetailPage;
