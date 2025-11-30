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
  alpha,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const PracticeAndLearnPage: React.FC = () => {
  const theme = useTheme();

  const borderColor = theme.palette.divider;
  const softInfo = alpha(theme.palette.info.main, 0.12);
  const softPrimary = alpha(theme.palette.primary.main, 0.12);

  return (
    <Box>
      <PageHeader
        title="Practice & Learn"
        subtitle="Adaptive practice sets, spaced repetition, and AI tutor assistance."
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.75 }}>
                  Practice workspace (coming soon)
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 560 }}>
                  This area will connect to AI-generated practice questions, adaptive drills, and a
                  focused tutor mode. For now, it&apos;s a placeholder so you can see how the navigation
                  and layout behave.
                </Typography>
              </Box>

              <Divider sx={{ borderColor, my: 0.5 }} />

              <Stack direction="row" spacing={1.25} flexWrap="wrap" rowGap={1}>
                <Chip size="small" label="Adaptive practice" variant="outlined" color="primary" />
                <Chip size="small" label="Concept targeting" variant="outlined" color="secondary" />
                <Chip size="small" label="AI tutor mode" variant="outlined" />
                <Chip size="small" label="Confidence tracking" variant="outlined" />
              </Stack>

              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    borderRadius: 999,
                    px: 2.8,
                    textTransform: 'none',
                    opacity: 0.6,
                  }}
                >
                  Start practice (coming soon)
                </Button>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  You&apos;ll be able to launch custom practice sets from here once the module is wired
                  into DarkML.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                p: 2.5,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  What this space will do
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 460 }}>
                  A dedicated lane for low-stakes practice, powered by the same AI engines that drive
                  analytics and grading.
                </Typography>
              </Box>

              <Divider sx={{ borderColor, mb: 0.5 }} />

              <Stack spacing={1.25}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: softInfo,
                    transition: '160ms ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.info.main, 0.18),
                      borderColor: theme.palette.info.main,
                    },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
                    Target weak concepts
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Pull in topics flagged as weak from analytics and generate focused drills.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: softPrimary,
                    transition: '160ms ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.18),
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
                    Explain & tutor
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ask follow-up questions, see step-by-step solutions, and get hints without
                    impacting your grades.
                  </Typography>
                </Box>

                <Box
                  sx={{
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
                  <Typography variant="subtitle2" sx={{ mb: 0.3 }}>
                    Session history
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Track what you practiced and how your mastery shifts over time.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PracticeAndLearnPage;
