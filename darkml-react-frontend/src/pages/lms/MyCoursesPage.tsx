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
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

type CourseStatus = 'Active' | 'Completed';

type Course = {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  term: string;
  progress: number;
  credits: number;
  schedule: string;
  upcomingDue?: string;
  status: CourseStatus;
  mastery: string;
  workload: 'Light' | 'Medium' | 'Heavy';
};

const mockCourses: Course[] = [
  {
    id: 'c1',
    name: 'Algebra I',
    teacher: 'Ms. Smith',
    subject: 'Math',
    term: 'Fall 2025',
    progress: 68,
    credits: 3,
    schedule: 'MWF 9:00-10:00',
    upcomingDue: 'Quiz 3 · Nov 26',
    status: 'Active',
    mastery: 'On track',
    workload: 'Medium',
  },
  {
    id: 'c2',
    name: 'Biology',
    teacher: 'Dr. Brown',
    subject: 'Science',
    term: 'Fall 2025',
    progress: 54,
    credits: 4,
    schedule: 'T/Th 10:30-12:00',
    upcomingDue: 'Lab report · Nov 24',
    status: 'Active',
    mastery: 'Needs attention',
    workload: 'Heavy',
  },
  {
    id: 'c3',
    name: 'World History',
    teacher: 'Mr. Lee',
    subject: 'Social Studies',
    term: 'Fall 2025',
    progress: 81,
    credits: 3,
    schedule: 'MWF 1:00-2:00',
    upcomingDue: 'Essay outline · Nov 30',
    status: 'Active',
    mastery: 'Excelling',
    workload: 'Medium',
  },
  {
    id: 'c4',
    name: 'English Literature',
    teacher: 'Ms. Johnson',
    subject: 'Language Arts',
    term: 'Fall 2025',
    progress: 92,
    credits: 3,
    schedule: 'T/Th 2:30-4:00',
    upcomingDue: 'Poetry analysis · Dec 2',
    status: 'Completed',
    mastery: 'Finalized',
    workload: 'Light',
  },
  {
    id: 'c5',
    name: 'Physics',
    teacher: 'Dr. Chen',
    subject: 'Science',
    term: 'Fall 2025',
    progress: 47,
    credits: 4,
    schedule: 'MWF 11:00-12:00',
    upcomingDue: 'Forces quiz · Nov 27',
    status: 'Active',
    mastery: 'Needs attention',
    workload: 'Heavy',
  },
  {
    id: 'c6',
    name: 'Computer Science',
    teacher: 'Mr. Patel',
    subject: 'Technology',
    term: 'Fall 2025',
    progress: 73,
    credits: 3,
    schedule: 'T/Th 9:00-10:15',
    upcomingDue: 'Project checkpoint · Nov 29',
    status: 'Active',
    mastery: 'On track',
    workload: 'Medium',
  },
  {
    id: 'c7',
    name: 'Art',
    teacher: 'Ms. Garcia',
    subject: 'Arts',
    term: 'Fall 2025',
    progress: 58,
    credits: 2,
    schedule: 'Friday 10:00-12:00',
    upcomingDue: 'Portfolio review · Dec 1',
    status: 'Active',
    mastery: 'On track',
    workload: 'Light',
  },
  {
    id: 'c8',
    name: 'Physical Education',
    teacher: 'Coach Davis',
    subject: 'Wellness',
    term: 'Fall 2025',
    progress: 84,
    credits: 1,
    schedule: 'Daily 8:00-8:45',
    upcomingDue: 'Fitness check-in · Nov 25',
    status: 'Active',
    mastery: 'Excelling',
    workload: 'Light',
  },
  {
    id: 'c9',
    name: 'Music',
    teacher: 'Mr. Martinez',
    subject: 'Arts',
    term: 'Fall 2025',
    progress: 76,
    credits: 2,
    schedule: 'Wed 3:00-5:00',
    upcomingDue: 'Recital draft · Nov 28',
    status: 'Active',
    mastery: 'On track',
    workload: 'Medium',
  },
  {
    id: 'c10',
    name: 'Geography',
    teacher: 'Ms. Adams',
    subject: 'Social Studies',
    term: 'Fall 2025',
    progress: 63,
    credits: 3,
    schedule: 'T/Th 1:00-2:15',
    upcomingDue: 'Map quiz · Nov 23',
    status: 'Active',
    mastery: 'On track',
    workload: 'Light',
  },
];

const MyCoursesPage: React.FC = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const softSuccess = alpha(theme.palette.success.main, 0.18);

  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<CourseStatus | 'All'>('All');
  const [subjectFilter, setSubjectFilter] = React.useState<string>('All subjects');

  const subjects = React.useMemo(
    () => ['All subjects', ...Array.from(new Set(mockCourses.map((c) => c.subject)))],
    []
  );

  const filteredCourses = React.useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch = `${course.name} ${course.teacher} ${course.subject}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
      const matchesSubject = subjectFilter === 'All subjects' || course.subject === subjectFilter;
      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [search, statusFilter, subjectFilter]);

  const activeCount = mockCourses.filter((c) => c.status === 'Active').length;
  const completedCount = mockCourses.filter((c) => c.status === 'Completed').length;

  return (
    <>
      <PageHeader
        title="My Courses"
        subtitle="Search, filter, and jump into your enrolled courses with a quick view of progress and upcoming work."
      />

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
          >
            <TextField
              fullWidth
              placeholder="Search by course, teacher, or subject"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
              <ToggleButtonGroup
                size="small"
                exclusive
                value={statusFilter}
                onChange={(_, value) => value && setStatusFilter(value)}
                sx={{
                  borderRadius: 999,
                  '& .MuiToggleButton-root': { textTransform: 'none', px: 1.8 },
                }}
              >
                <ToggleButton value="All">All</ToggleButton>
                <ToggleButton value="Active">Active ({activeCount})</ToggleButton>
                <ToggleButton value="Completed">Completed ({completedCount})</ToggleButton>
              </ToggleButtonGroup>

              <TextField
                select
                size="small"
                label="Subject"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                sx={{ minWidth: 160 }}
                SelectProps={{ IconComponent: FilterAltIcon }}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" color="primary" label={`${activeCount} active courses`} />
            <Chip size="small" variant="outlined" label={`${completedCount} completed`} />
            <Chip size="small" variant="outlined" label={`${mockCourses.length} total enrolled`} />
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
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
                  gap: 1.5,
                  p: 2.4,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.5}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      sx={{
                        mb: 0.25,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        color: 'text.primary',
                      }}
                    >
                      {course.name}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary', mb: 0.25 }}>
                      {course.subject} • {course.term}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                      Teacher: {course.teacher}
                    </Typography>
                  </Box>
                  <Stack spacing={0.5} alignItems="flex-end" sx={{ flexShrink: 0 }}>
                    <Chip size="small" label={`${course.credits} credits`} variant="outlined" />
                    <Chip
                      size="small"
                      label={course.status}
                      color={course.status === 'Active' ? 'success' : 'default'}
                      variant={course.status === 'Active' ? 'filled' : 'outlined'}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={0.75}>
                  <Stack direction="row" spacing={1} alignItems="center">
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
                      Enrolled • {course.schedule}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 999 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 48 }}>
                      {course.progress}%
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      size="small"
                      color="primary"
                      variant="outlined"
                      label={course.upcomingDue || 'No deadlines'}
                    />
                    <Chip size="small" variant="outlined" label={`Mastery: ${course.mastery}`} />
                    <Chip size="small" variant="outlined" label={`Workload: ${course.workload}`} />
                  </Stack>
                </Stack>

                <Divider sx={{ borderColor }} />

                <Stack direction="row" spacing={1.25} alignItems="center" justifyContent="space-between">
                  <Stack spacing={0.3}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Agenda preview
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {course.upcomingDue || 'No upcoming items'}
                    </Typography>
                  </Stack>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/lms/student/courses/${course.id}`}
                    variant="contained"
                    sx={{ borderRadius: 999, px: 2.4, textTransform: 'none' }}
                  >
                    Open
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyCoursesPage;
