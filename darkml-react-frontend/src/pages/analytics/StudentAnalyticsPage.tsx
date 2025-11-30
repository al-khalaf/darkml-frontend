import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import BarChartCard from '../../components/charts/BarChartCard';
import LineChartCard from '../../components/charts/LineChartCard';
import PieChartCard from '../../components/charts/PieChartCard';

const StudentAnalyticsPage: React.FC = () => {
  const performanceByCourse = [
    { course: 'Algebra I', score: 82 },
    { course: 'Biology', score: 76 },
    { course: 'History', score: 88 },
  ];

  const topicMastery = [
    { topic: 'Linear Equations', value: 80 },
    { topic: 'Quadratics', value: 70 },
    { topic: 'Functions', value: 65 },
  ];

  const riskDistribution = [
    { name: 'Low', value: 70 },
    { name: 'Medium', value: 20 },
    { name: 'High', value: 10 },
  ];

  const avgScore =
    performanceByCourse.reduce((sum, c) => sum + c.score, 0) /
    performanceByCourse.length;

  const bestCourse =
    performanceByCourse.length > 0
      ? performanceByCourse.reduce((prev, c) =>
          c.score > prev.score ? c : prev
        )
      : undefined;

  const totalRisk = riskDistribution.reduce((sum, r) => sum + r.value, 0);
  const lowBucket = riskDistribution.find((r) => r.name === 'Low')?.value ?? 0;
  const lowShare =
    totalRisk === 0 ? 0 : (lowBucket / totalRisk) * 100;

  const riskPieData = riskDistribution.map((r) => ({
    label: r.name,
    value: r.value,
  }));

  return (
    <>
      <PageHeader
        title="General Analytics"
        subtitle="Your performance, mastery, and risk profile across all courses."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Average course score"
            value={`${avgScore.toFixed(1)}%`}
            helperText="Across all active courses"             sx={{ borderRadius: 2 }}

          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Best-performing course"             sx={{ borderRadius: 2 }}

            value={bestCourse ? bestCourse.course : 'N/A'}
            helperText={
              bestCourse ? `${bestCourse.score}% average` : 'No data available'
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Low-risk share"             sx={{ borderRadius: 2 }}

            value={`${lowShare.toFixed(1)}%`}
            helperText="Portion of assessments with low risk"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Performance by course"
            data={performanceByCourse}
            xKey="course"
            yKey="score"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LineChartCard
            title="Topic mastery"
            data={topicMastery}
            xKey="topic"
            yKey="value"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard
            title="Risk distribution"
            data={riskPieData}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
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
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Notes & roadmap
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 520 }}
                  >
                    This view will evolve into a full personal analytics cockpit.
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
                    label="Student view"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label="AI-driven insights later"
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

              <Stack spacing={1.25}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Performance by course shows where you&apos;re currently
                  strongest and where you may need more practice.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Topic mastery will later link directly to targeted practice and
                  AI tutor sessions.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Risk distribution will be computed from live models predicting
                  missed work, low scores, and knowledge gaps.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentAnalyticsPage;
