import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const mockCourses = [
  { id: 'c1', name: 'Algebra I', code: 'ALG-101', division: 'HS' },
  { id: 'c2', name: 'Biology', code: 'BIO-201', division: 'HS' },
  { id: 'c3', name: 'World History', code: 'HIS-110', division: 'MS' },
];

const divisionLabel: Record<string, string> = {
  HS: 'High School',
  MS: 'Middle School',
  ES: 'Elementary School',
};

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const borderColor = theme.palette.divider;
  const softSuccess = alpha(theme.palette.success.main, 0.15);

  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="All courses you manage or can view across divisions."
      />

      <Grid container spacing={3}>
        {mockCourses.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
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
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
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
                  p: 2.5,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        mb: 0.75,
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
                      Code: {course.code}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={divisionLabel[course.division] ?? course.division}
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
                    Course is active
                  </Typography>
                </Stack>

                <Box sx={{ mt: 0.5 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/lms/courses/${course.id}`)}
                    sx={{
                      borderRadius: 999,
                      px: 2.2,
                      textTransform: 'none',
                    }}
                  >
                    Manage course
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

export default CoursesPage;
