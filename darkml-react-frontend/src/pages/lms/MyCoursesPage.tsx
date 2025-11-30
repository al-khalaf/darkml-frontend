import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const mockCourses = [
  { id: 'c1', name: 'Algebra I', teacher: 'Ms. Smith' },
  { id: 'c2', name: 'Biology', teacher: 'Dr. Brown' },
  { id: 'c3', name: 'World History', teacher: 'Mr. Lee' },
  { id: 'c4', name: 'English Literature', teacher: 'Ms. Johnson' },
  { id: 'c5', name: 'Physics', teacher: 'Dr. Chen' },
  { id: 'c6', name: 'Computer Science', teacher: 'Mr. Patel' },
  { id: 'c7', name: 'Art', teacher: 'Ms. Garcia' },
  { id: 'c8', name: 'Physical Education', teacher: 'Coach Davis' },
  { id: 'c9', name: 'Music', teacher: 'Mr. Martinez' },
  { id: 'c10', name: 'Geography', teacher: 'Ms. Adams' },
];

const MyCoursesPage: React.FC = () => {
  const theme = useTheme();

  const borderColor = theme.palette.divider;
  const softSuccess = alpha(theme.palette.success.main, 0.18);

  return (
    <>
      <PageHeader
        title="My Courses"
        subtitle="All courses you are currently enrolled in, across subjects and divisions."
      />

      <Grid container spacing={3}>
        {mockCourses.map((course, index) => (
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
                      Teacher: {course.teacher}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={`#${index + 1}`}
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
                    Enrolled • Active course
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
    </>
  );
};

export default MyCoursesPage;
