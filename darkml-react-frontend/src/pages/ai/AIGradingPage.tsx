import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { alpha } from '@mui/material/styles';
import RoleGuard from '../../components/guards/RoleGuard';

const AIGradingPage: React.FC = () => {
  const theme = useTheme();

  const courses = [
    { id: 'c1', name: 'Algebra I' },
    { id: 'c2', name: 'Biology' },
  ];

  const assessmentsByCourse = {
    c1: [
      { id: 'a1', title: 'Quiz 1', graded: false },
      { id: 'a2', title: 'Assignment 1', graded: true },
    ],
    c2: [{ id: 'b1', title: 'Lab Report', graded: false }],
  } as Record<string, { id: string; title: string; graded: boolean }[]>;

  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);

  const selectedCourseMeta = selectedCourse
    ? courses.find((c) => c.id === selectedCourse) ?? null
    : null;

  const selectedAssessments = selectedCourse
    ? assessmentsByCourse[selectedCourse] ?? []
    : [];

  return (
    <RoleGuard
      roles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']}
      fallbackTitle="Teacher workspace only"
      fallbackMessage="Only teachers and admins can review and override AI-assisted grading queues."
    >
      <Box>
        <PageHeader
          title="AI Grading"
          subtitle="Review AI-suggested grades by assessment and override when needed."
        />

      {/* ================================
          COURSE SELECTION
      ==================================*/}
      {!selectedCourse && (
        <Grid container spacing={3}>
          {courses.map((course) => {
            const assessments = assessmentsByCourse[course.id] ?? [];
            const pendingCount = assessments.filter((a) => !a.graded).length;
            const totalCount = assessments.length;

            return (
              <Grid item xs={12} md={4} key={course.id}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    transition: 'all .15s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.08),
                      borderColor: theme.palette.primary.light,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
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
                          }}
                        >
                          {course.name}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          AI grading workspace for this course.
                        </Typography>
                      </Box>

                      <Stack spacing={0.75} alignItems="flex-end">
                        <Chip
                          size="small"
                          label={`${totalCount} assessments`}
                          variant="outlined"
                          color="primary"
                        />
                        <Chip
                          size="small"
                          label={`${pendingCount} pending`}
                          variant="outlined"
                          color={pendingCount > 0 ? 'warning' : 'success'}
                        />
                      </Stack>
                    </Box>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setSelectedCourse(course.id)}
                      sx={{
                        borderRadius: 999,
                        px: 2.2,
                        textTransform: 'none',
                        mt: 0.5,
                        alignSelf: 'flex-start',
                      }}
                    >
                      Open grading queue
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* ================================
          ASSESSMENTS LIST
      ==================================*/}
      {selectedCourse && selectedCourseMeta && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Assessments – {selectedCourseMeta.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                  Use AI grading for new submissions and review or override existing
                  AI-suggested scores.
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: 'wrap', rowGap: 1, justifyContent: 'flex-end' }}
              >
                <Chip
                  size="small"
                  label={`${selectedAssessments.length} assessments`}
                  variant="outlined"
                  color="primary"
                />
                <Chip
                  size="small"
                  label={`${selectedAssessments.filter((a) => !a.graded).length} pending`}
                  variant="outlined"
                  color={
                    selectedAssessments.filter((a) => !a.graded).length > 0
                      ? 'warning'
                      : 'success'
                  }
                />
              </Stack>
            </Box>

            <Divider />

            <Stack spacing={1.25}>
              {selectedAssessments.map((a) => (
                <Box
                  key={a.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all .15s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.08),
                      borderColor: a.graded
                        ? theme.palette.success.main
                        : theme.palette.primary.light,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ fontWeight: 500 }}
                    >
                      {a.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: 'text.secondary' }}
                    >
                      {a.graded
                        ? 'Already graded via AI / teacher review.'
                        : 'Pending AI grading. Launch the AI grader to review and confirm scores.'}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Chip
                      size="small"
                      label={a.graded ? 'Graded' : 'Awaiting grading'}
                      variant="outlined"
                      color={a.graded ? 'success' : 'warning'}
                    />

                    {a.graded ? (
                      <Button disabled variant="contained" size="small">
                        Graded
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        component={RouterLink}
                        to={`/ai/grading/${a.id}`}
                      >
                        AI grade
                      </Button>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                gap: 1.5,
                mt: 1.75,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setSelectedCourse(null)}
                sx={{ borderRadius: 999, textTransform: 'none' }}
              >
                Back to courses
              </Button>

              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 420 }}>
                This is a mock AI grading workflow. Connect this page to the grading APIs to
                stream suggested scores and explanations from DarkML.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
      </Box>
    </RoleGuard>
  );
};

export default AIGradingPage;
