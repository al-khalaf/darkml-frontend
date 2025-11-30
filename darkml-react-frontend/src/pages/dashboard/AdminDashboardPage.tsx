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

const AdminDashboardPage: React.FC = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const divisionStats = {
    attendanceRate: 92,
    avgPerformance: 78,
    riskCount: 32,
    division: 'Middle School',
    problemSubjects: [
      { subject: 'Mathematics', severity: 'High' },
      { subject: 'Science', severity: 'Medium' },
    ],
    gradeAverages: [
      { grade: '6th', avg: 75 },
      { grade: '7th', avg: 78 },
      { grade: '8th', avg: 80 },
    ],
    riskDistribution: [
      { name: 'Low', value: 65 },
      { name: 'Medium', value: 25 },
      { name: 'High', value: 10 },
    ],
  };

  const riskPieData = divisionStats.riskDistribution.map((r) => ({
    label: r.name,
    value: r.value,
  }));

  const severityColor: Record<string, 'error' | 'warning' | 'success' | 'default'> = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
  };

  return (
    <Box>
      <PageHeader
        title={`Admin Dashboard – ${divisionStats.division}`}
        subtitle="Division-level attendance, performance, and risk signals across your schools."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            sx={{ borderRadius: 2 }}
            label="Avg Attendance"
            value={`${divisionStats.attendanceRate}%`}
            helperText="Rolling 30-day average across the division"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            sx={{ borderRadius: 2 }}
            label="Avg Performance"
            value={`${divisionStats.avgPerformance}%`}
            helperText="Weighted by course credit and enrollment"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            sx={{ borderRadius: 2 }}
            label="At-Risk Students"
            value={divisionStats.riskCount}
            helperText="Students currently flagged by risk models"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Grade-Level Averages"
            data={divisionStats.gradeAverages}
            xKey="grade"
            yKey="avg"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard title="Risk Distribution" data={riskPieData} />
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Top Problem Subjects
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 480 }}>
                    Subjects with persistent performance or attendance issues across cohorts. Use this
                    list to align interventions and resource allocation.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={`${divisionStats.problemSubjects.length} focus areas`}
                  variant="outlined"
                  color="primary"
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Box>

              <Divider sx={{ borderColor, mb: 0.5 }} />

              <Stack spacing={1.25}>
                {divisionStats.problemSubjects.map((subj, i) => {
                  const bg =
                    subj.severity === 'High'
                      ? alpha(theme.palette.error.main, 0.12)
                      : subj.severity === 'Medium'
                      ? alpha(theme.palette.warning.main, 0.12)
                      : theme.palette.background.paper;

                  const hoverBorder =
                    subj.severity === 'High'
                      ? theme.palette.error.main
                      : subj.severity === 'Medium'
                      ? theme.palette.warning.main
                      : theme.palette.primary.light;

                  return (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        px: 1.5,
                        py: 1.1,
                        borderRadius: 2,
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bg,
                        transition: '160ms ease',
                        '&:hover': {
                          backgroundColor: alpha(hoverBorder, 0.08),
                          borderColor: hoverBorder,
                        },
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 500 }}>
                          {subj.subject}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {subj.severity} concern • Requires targeted support
                        </Typography>
                      </Box>

                      <Chip
                        size="small"
                        label={`${subj.severity} concern`}
                        color={severityColor[subj.severity] ?? 'default'}
                        variant="outlined"
                      />
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;
