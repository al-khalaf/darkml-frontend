import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { getAssessmentById, getCourseById } from '../../data/lmsData';

// Mock data
const mockAssessment = {
  id: 'a1',
  title: 'Algebra Quiz 3',
  course: 'Algebra I',
  type: 'QUIZ',
  dueDate: '2025-11-25',
  questions: [
    { id: 'q1', text: 'Solve 2x + 3 = 7', maxScore: 5 },
    { id: 'q2', text: 'Simplify 3(x + 2)', maxScore: 5 },
  ],
};

const AssessmentDetailPage: React.FC = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const assessment = React.useMemo(
    () => getAssessmentById(assessmentId),
    [assessmentId]
  );
  const course = React.useMemo(
    () => getCourseById(assessment?.courseId),
    [assessment?.courseId]
  );

  React.useEffect(() => {
    if (assessmentId && !assessment) {
      navigate('/lms/assessments', {
        replace: true,
        state: { missingAssessmentId: assessmentId },
      });
    }
  }, [assessment, assessmentId, navigate]);

  if (!assessment) {
    return null;
  }

  const totalMaxScore = assessment.questions.reduce(
    (sum, q) => sum + q.maxScore,
    0
  );

  return (
    <>
      <PageHeader
        title={`Assessment: ${assessment.title}`}
        subtitle={`${course?.name ?? 'Unknown course'} • Type: ${assessment.type} • Due: ${assessment.dueDate}`}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              position: 'relative',
              overflow: 'hidden',
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
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Questions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 480 }}
                  >
                    Each question contributes to the overall mastery score for this
                    assessment.
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  <Chip
                    size="small"
                    label={`${assessment.questions.length} questions`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${totalMaxScore} total points`}
                    color="success"
                    variant="outlined"
                  />
                </Stack>
              </Box>

              <Divider
                sx={{
                  borderColor: 'rgba(148,163,184,0.4)',
                  mb: 0.5,
                }}
              />

              <List dense disablePadding>
                {assessment.questions.map((q, index) => (
                  <ListItem
                    key={q.id}
                    disableGutters
                    sx={{
                      mb: 1.1,
                      px: 1.5,
                      py: 1.15,
                      borderRadius: 2,
                      border: '1px solid rgba(55,65,81,0.85)',
                      background:
                        'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      transition:
                        'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                      '&:hover': {
                        borderColor: 'rgba(129,140,248,0.9)',
                        boxShadow:
                          '0 14px 35px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5, minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '999px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'primary.contrastText',
                          background:
                            'linear-gradient(135deg, #4F46E5, #6366F1, #818CF8)',
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: 'subtitle1',
                          sx: { fontWeight: 500 },
                        }}
                        secondaryTypographyProps={{
                          variant: 'body2',
                          sx: { color: 'text.secondary' },
                        }}
                        primary={q.text}
                        secondary={`Max Score: ${q.maxScore}`}
                        sx={{
                          m: 0,
                          minWidth: 0,
                        }}
                      />
                    </Box>
                    <Chip
                      size="small"
                      label={`${q.maxScore} pts`}
                      color="primary"
                      variant="outlined"
                      sx={{ flexShrink: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AssessmentDetailPage;
