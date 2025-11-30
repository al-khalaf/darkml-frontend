import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

interface Question {
  id: string;
  text: string;
  type: 'short_answer' | 'essay';
}

const mockQuestions: Question[] = [
  { id: 'q1', text: 'Explain the Pythagorean theorem.', type: 'short_answer' },
  { id: 'q2', text: 'Describe the process of photosynthesis.', type: 'essay' },
];

const StudentTakeAssessmentPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const theme = useTheme();

  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted answers for', assessmentId, answers);
    setSubmitted(true);
  };

  const totalQuestions = mockQuestions.length;
  const answeredCount = mockQuestions.filter((q) => {
    const v = answers[q.id];
    return v !== undefined && v.trim() !== '';
  }).length;

  const borderColor = theme.palette.divider;
  const softPrimary = alpha(theme.palette.primary.main, 0.08);

  return (
    <Box>
      <PageHeader
        title={`Assessment ${assessmentId ?? ''}`}
        subtitle="Answer the questions below. Your responses are saved locally until submission."
      />

      <Card variant="outlined">
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
                Response workspace
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                Provide your best answers. You can review and edit before you submit.
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{ rowGap: 1 }}
            >
              <Chip
                size="small"
                label={`${answeredCount}/${totalQuestions} answered`}
                variant="outlined"
                color={
                  answeredCount === totalQuestions
                    ? 'success'
                    : answeredCount > 0
                    ? 'warning'
                    : 'default'
                }
              />
              <Chip size="small" label={`${totalQuestions} questions`} variant="outlined" color="primary" />
            </Stack>
          </Box>

          <Divider sx={{ borderColor, mb: 0.5 }} />

          <Stack spacing={1.75}>
            {mockQuestions.map((q, index) => (
              <Box
                key={q.id}
                sx={{
                  px: 1.75,
                  py: 1.5,
                  borderRadius: 2,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: theme.palette.background.paper,
                  transition: '160ms ease',
                  '&:hover': {
                    backgroundColor: softPrimary,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={1.5}
                  sx={{ mb: 1 }}
                >
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      {index + 1}
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
                      {q.text}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={q.type === 'essay' ? 'Essay' : 'Short answer'}
                    variant="outlined"
                    color={q.type === 'essay' ? 'secondary' : 'default'}
                  />
                </Stack>

                <TextField
                  multiline
                  minRows={q.type === 'essay' ? 5 : 3}
                  fullWidth
                  variant="outlined"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  disabled={submitted}
                  placeholder={
                    q.type === 'essay'
                      ? 'Write a detailed explanation...'
                      : 'Write a concise answer...'
                  }
                />
              </Box>
            ))}
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              mt: 1.5,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitted}
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
            >
              {submitted ? 'Submitted' : 'Submit'}
            </Button>

            {submitted && (
              <Typography
                sx={{ mt: { xs: 0.5, sm: 0 }, maxWidth: 420 }}
                color="success.main"
                variant="body2"
              >
                Submission received (mock). Grading may be automatic or completed later by your
                teacher.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentTakeAssessmentPage;
