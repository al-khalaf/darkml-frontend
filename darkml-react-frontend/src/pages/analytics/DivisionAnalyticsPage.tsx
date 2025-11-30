import React from 'react';
import {
  Grid,
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
import PieChartCard from '../../components/charts/PieChartCard';

// Mock division analytics
const mockDivision = {
  gradeAverages: [
    { grade: 'Grade 6', average: 78 },
    { grade: 'Grade 7', average: 82 },
    { grade: 'Grade 8', average: 80 },
  ],
  subjectMastery: [
    { subject: 'Math', mastery: 75 },
    { subject: 'Science', mastery: 81 },
    { subject: 'English', mastery: 84 },
  ],
  riskClusters: [
    { label: 'Low', value: 120 },
    { label: 'Medium', value: 25 },
    { label: 'High', value: 10 },
  ],
};

const DivisionAnalyticsPage: React.FC = () => {
  const avgGrade =
    mockDivision.gradeAverages.reduce((sum, g) => sum + g.average, 0) /
    mockDivision.gradeAverages.length;

  const avgMastery =
    mockDivision.subjectMastery.reduce((sum, s) => sum + s.mastery, 0) /
    mockDivision.subjectMastery.length;

  const totalStudents = mockDivision.riskClusters.reduce(
    (sum, c) => sum + c.value,
    0
  );

  const atRiskStudents = mockDivision.riskClusters
    .filter((c) => c.label !== 'Low')
    .reduce((sum, c) => sum + c.value, 0);

  const highRiskCount =
    mockDivision.riskClusters.find((c) => c.label === 'High')?.value ?? 0;

  const riskPieData = mockDivision.riskClusters.map((cluster) => ({
    label: cluster.label,
    value: cluster.value,
  }));

  return (
    <>
      <PageHeader
        title="Division Analytics"
        subtitle="Division-level performance, mastery, and risk metrics."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Avg grade (division)" sx={{ borderRadius: 2 }}
            value={`${avgGrade.toFixed(1)}%`}
            helperText="Across all grade levels in this division"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Avg subject mastery" sx={{ borderRadius: 2 }}
            value={`${avgMastery.toFixed(1)}%`}
            helperText="Mean mastery across core subjects"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="At-risk students" sx={{ borderRadius: 2 }}
            value={atRiskStudents}
            helperText="Medium + high risk clusters"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Average grades by level"
            data={mockDivision.gradeAverages}
            xKey="grade"
            yKey="average"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Subject mastery"
            data={mockDivision.subjectMastery}
            xKey="subject"
            yKey="mastery"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard
            title="Risk clusters"
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
                    Division signals
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 520 }}
                  >
                    High-level indicators summarizing performance and risk across
                    this division.
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
                    label={`${totalStudents} students`}
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label={`${highRiskCount} high risk`}
                    variant="outlined"
                    color="error"
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
                  • Grade-level averages show where cohorts are trending above or
                  below the division mean.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Subject mastery surfaces which disciplines may need extra
                  staffing, interventions, or curriculum support.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Risk clusters (low / medium / high) summarize students most in
                  need of attention. Drilldowns will later link directly into student
                  and class analytics.
                </Typography>
              </Stack>
            </CardContent>            

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DivisionAnalyticsPage;
