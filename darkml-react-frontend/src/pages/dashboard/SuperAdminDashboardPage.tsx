import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';

import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import BarChartCard from '../../components/charts/BarChartCard';
import PieChartCard from '../../components/charts/PieChartCard';

const SuperAdminDashboardPage: React.FC = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const systemStats = {
    totalStudents: 2300,
    totalTeachers: 160,
    avgMCI: 72,
    riskDistribution: [
      { name: 'Low', value: 1600 },
      { name: 'Medium', value: 550 },
      { name: 'High', value: 150 },
    ],
    mciBuckets: [
      { bucket: '0–40', value: 300 },
      { bucket: '40–60', value: 900 },
      { bucket: '60–80', value: 700 },
      { bucket: '80–100', value: 400 },
    ],
    divisionStats: [
      { division: 'Elementary', perf: 74 },
      { division: 'Middle', perf: 78 },
      { division: 'High School', perf: 82 },
    ],
    metaAnalytics: {
      warnings: 12,
      errors: 3,
    },
  };

  const riskPieData = systemStats.riskDistribution.map((r) => ({
    label: r.name,
    value: r.value,
  }));

  return (
    <Box>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="System-wide academic performance, risk posture, and AI governance signals."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Total Students"
            value={systemStats.totalStudents}
            helperText="Active learners across all divisions"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="Total Teachers"
            value={systemStats.totalTeachers}
            helperText="Licensed educators in the system"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="Avg MCI"
            value={`${systemStats.avgMCI}%`}
            helperText="Mean mastery & comprehension index"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="AI Errors / Warnings"
            value={`${systemStats.metaAnalytics.errors} / ${systemStats.metaAnalytics.warnings}`}
            helperText="Governance events in the last 24h"
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Division Performance"
            data={systemStats.divisionStats}
            xKey="division"
            yKey="perf"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard title="Risk Distribution" data={riskPieData} />
        </Grid>

        <Grid item xs={12}>
          <BarChartCard
            title="MCI Distribution"
            data={systemStats.mciBuckets}
            xKey="bucket"
            yKey="value"
          />
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Meta Analytics Health
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
                    High-level health view of AI pipelines, governance events, and monitoring alerts
                    across the entire deployment.
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{ alignSelf: 'flex-start' }}>
                  <Chip
                    size="small"
                    label={`${systemStats.metaAnalytics.errors} errors`}
                    color="error"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${systemStats.metaAnalytics.warnings} warnings`}
                    color="warning"
                    variant="outlined"
                  />
                </Stack>
              </Box>

              <Divider sx={{ borderColor, mb: 0.5 }} />

              <Stack spacing={1.5}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: alpha(theme.palette.error.main, 0.12),
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Errors
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Critical AI incidents requiring immediate review.
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {systemStats.metaAnalytics.errors}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: alpha(theme.palette.warning.main, 0.12),
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Warnings
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Non-blocking anomalies and policy nudges.
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {systemStats.metaAnalytics.warnings}
                  </Typography>
                </Box>
              </Stack>

              <Typography sx={{ mt: 1.5 }} color="text.secondary" variant="body2">
                All detailed AI Governance modules, overrides, and incident timelines are available
                from the sidebar for deeper inspection.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboardPage;
