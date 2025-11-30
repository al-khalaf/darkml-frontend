import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import { runWhatIf } from '../../api/aiApi';
import BarChartCard from '../../components/charts/BarChartCard';

interface WhatIfForm {
  question: string;
}

const WhatIfEnginePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<WhatIfForm>({
    defaultValues: {
      question: '',
    },
  });

  const [result, setResult] = React.useState<any>(null);

  const onSubmit = async (data: WhatIfForm) => {
    const res = await runWhatIf(data.question);
    setResult(res);
  };

  const questionValue = watch('question');
  const hasQuestion = questionValue && questionValue.trim().length > 0;

  return (
    <>
      <PageHeader
        title="What-If Analysis"
        subtitle="Ask hypothetical scenario questions and explore projected outcomes."
      />

      <Card
        variant="outlined"
        sx={{
          mb: 3,
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
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Scenario setup
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', maxWidth: 520 }}
            >
              Describe a change you want to test. The engine will simulate
              downstream impact on metrics and cohorts.
            </Typography>
          </Box>

          <Divider
            sx={{
              borderColor: 'rgba(148,163,184,0.4)',
              mb: 0.5,
            }}
          />

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              label="What if..."
              placeholder="e.g. What if attendance improves by 10% across middle school?"
              {...register('question')}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !hasQuestion}
                sx={{
                  alignSelf: { xs: 'stretch', sm: 'flex-start' },
                }}
              >
                {isSubmitting ? 'Running scenario…' : 'Run scenario'}
              </Button>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                sx={{ rowGap: 1 }}
              >
                <Chip
                  size="small"
                  label="Simulation engine"
                  variant="outlined"
                  color="primary"
                />
                <Chip
                  size="small"
                  label="Non-destructive, sandboxed"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {result && (
        <Card
          variant="outlined"
          sx={{
            mb: 3,
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
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                  Scenario explanation
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 640 }}
                >
                  Narrative summary of the simulated impact of your what-if
                  question.
                </Typography>
              </Box>
              <Chip
                size="small"
                label="AI interpretation"
                variant="outlined"
                color="secondary"
              />
            </Box>

            <Divider
              sx={{
                borderColor: 'rgba(148,163,184,0.4)',
                mb: 0.5,
              }}
            />

            <Box
              sx={{
                px: 1.75,
                py: 1.5,
                borderRadius: 2,
                border: '1px solid rgba(55,65,81,0.9)',
                background:
                  'radial-gradient(circle at 0% 0%, rgba(129,140,248,0.28), transparent 55%), rgba(15,23,42,0.97)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  color: 'text.primary',
                  lineHeight: 1.6,
                }}
              >
                {result.explanation}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {result?.series && Array.isArray(result.series) && result.series.length > 0 && (
        <Grid container spacing={3}>
          {result.series.map((series: any, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <BarChartCard
                title={series.label}
                data={series.categories.map((c: string, index: number) => ({
                  category: c,
                  value: series.data[index],
                }))}
                xKey="category"
                yKey="value"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default WhatIfEnginePage;
