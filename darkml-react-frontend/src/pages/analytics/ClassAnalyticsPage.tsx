// Your updated ClassAnalyticsPage with added sections
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

const ClassAnalyticsPage: React.FC = () => {
  // --- Mock data additions ---
  const mockData = {
    decliningStudents: [
      { name: 'Jamie L.', drop: 12 },
      { name: 'Carlos M.', drop: 9 },
    ],
    weakTopics: [
      { topic: 'Linear Equations', score: 62 },
      { topic: 'Cell Structure', score: 58 },
    ],
    topPerformers: [
      { name: 'Ava P.', score: 98 },
      { name: 'Noah K.', score: 95 },
    ],
  };
  const performanceAcrossClasses = [
    { class: 'Algebra I', score: 78 },
    { class: 'Biology', score: 83 },
  ];

  const riskDistribution = [
    { name: 'Low', value: 40 },
    { name: 'Medium', value: 35 },
    { name: 'High', value: 25 },
  ];

  const attendanceTrends = [
    { month: 'Sept', value: 92 },
    { month: 'Oct', value: 89 },
    { month: 'Nov', value: 94 },
  ];

  const avgScore =
    performanceAcrossClasses.reduce((sum, c) => sum + c.score, 0) /
    performanceAcrossClasses.length;

  const highRiskShare =
    riskDistribution.find((r) => r.name === 'High')?.value ?? 0;

  const latestAttendance =
    attendanceTrends[attendanceTrends.length - 1]?.value ?? 0;

  const riskPieData = riskDistribution.map((r) => ({
    label: r.name,
    value: r.value,
  }));

  return (
    <>
      <PageHeader
        title="Teacher Analytics"
        subtitle="Aggregated analytics across your classes and students."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Avg class score"
            value={`${avgScore.toFixed(1)}%`}
            helperText="Across all active classes"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            label="High-risk share"
            value={`${highRiskShare}%`}
            helperText="Students flagged as high risk"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            label="Latest attendance"
            value={`${latestAttendance}%`}
            helperText="Most recent month"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Average score by class"
            data={performanceAcrossClasses}
            xKey="class"
            yKey="score"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard
            title="Risk distribution"
            data={riskPieData}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LineChartCard
            title="Attendance trends"
            data={attendanceTrends}
            xKey="month"
            yKey="value"
          />
        </Grid>

        {/* --- Added Sections --- */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Declining Students Report</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {mockData.decliningStudents.map((s, i) => (
                <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                  • {s.name} — {s.drop}% drop
                </Typography>
              ))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Weak Topics Across All Classes</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {mockData.weakTopics.map((t, i) => (
                <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                  • {t.topic}: {t.score}% mastery
                </Typography>
              ))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Top Performers</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {mockData.topPerformers.map((p, i) => (
                <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                  • {p.name}: {p.score}%
                </Typography>
              ))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notes & Next Steps */}
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}
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
                    Notes & next steps
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 520 }}
                  >
                    Use these analytics as a starting point to drill into specific
                    students, concepts, and classes.
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
                  <Chip size="small" label="Class-level view" variant="outlined" color="primary" />
                  <Chip size="small" label="Student drilldowns later" variant="outlined" />
                </Stack>
              </Box>

              <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)', mb: 0.5 }} />

              <Stack spacing={1.25}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • This page will later surface student-level mastery, risk, and topic analytics once the backend is wired in.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Expect per-student drilldowns, concept mastery maps, and AI nudges for intervention priorities.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • For now, use the score, risk, and attendance signals above as a coarse health check across your classes.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ClassAnalyticsPage;
