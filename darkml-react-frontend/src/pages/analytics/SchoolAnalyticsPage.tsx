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
import PieChartCard from '../../components/charts/PieChartCard';
import BarChartCard from '../../components/charts/BarChartCard';

// Mock data
const mockSchool = {
  divisionPerformance: [
    { division: 'Elementary', average: 82 },
    { division: 'Middle', average: 78 },
    { division: 'High School', average: 80 },
  ],
  mciDistribution: [
    { label: 'Above 0.8', value: 320 },
    { label: '0.6 - 0.8', value: 150 },
    { label: 'Below 0.6', value: 40 },
  ],
};

const SchoolAnalyticsPage: React.FC = () => {
  const avgDivisionPerf =
    mockSchool.divisionPerformance.reduce(
      (sum, d) => sum + d.average,
      0
    ) / mockSchool.divisionPerformance.length;

  const totalMci = mockSchool.mciDistribution.reduce(
    (sum, b) => sum + b.value,
    0
  );

  const highBucket =
    mockSchool.mciDistribution.find((b) => b.label === 'Above 0.8')
      ?.value ?? 0;
  const midBucket =
    mockSchool.mciDistribution.find((b) => b.label === '0.6 - 0.8')
      ?.value ?? 0;
  const lowBucket =
    mockSchool.mciDistribution.find((b) => b.label === 'Below 0.6')
      ?.value ?? 0;

  const highShare =
    totalMci === 0 ? 0 : (highBucket / totalMci) * 100;
  const lowShare =
    totalMci === 0 ? 0 : (lowBucket / totalMci) * 100;

  const mciPieData = mockSchool.mciDistribution.map((b) => ({
    label: b.label,
    value: b.value,
  }));

  return (
    <>
      <PageHeader
        title="School-wide Analytics"
        subtitle="Global overview across all divisions and mastery confidence."
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Avg division performance" sx={{ borderRadius: 2 }}
            value={`${avgDivisionPerf.toFixed(1)}%`}
            helperText="Mean academic performance across all divisions"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="High MCI share" sx={{ borderRadius: 2 }}
            value={`${highShare.toFixed(1)}%`}
            helperText="Students with mastery confidence index > 0.8"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard sx={{ borderRadius: 2 }}
            label="Low MCI share"
            value={`${lowShare.toFixed(1)}%`}
            helperText="Students with mastery confidence index < 0.6"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Division performance"
            data={mockSchool.divisionPerformance}
            xKey="division"
            yKey="average"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChartCard
            title="MCI distribution"
            data={mciPieData}
          />
        </Grid>

        <Grid item xs={12}>
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
                    System summary
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 640 }}
                  >
                    High-level signals across divisions and mastery confidence
                    buckets for decision-makers and school leadership.
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
                    label="Division view"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label="MCI-based risk"
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
                  • Division performance highlights which parts of the school are
                  outperforming or lagging the global average.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • MCI distribution splits students into confidence bands
                  (above 0.8, 0.6–0.8, below 0.6) for targeted intervention and
                  curriculum planning.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Future iterations will add drilldowns into division, class,
                  and student-level analytics from this overview.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SchoolAnalyticsPage;
