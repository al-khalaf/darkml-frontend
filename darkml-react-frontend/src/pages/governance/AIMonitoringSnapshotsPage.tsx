import React from 'react';
import { Grid, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { getAIMonitoringSnapshots } from '../../api/governanceApi';
import type { AIMonitoringSnapshot } from '../../types/models';
import BarChartCard from '../../components/charts/BarChartCard';

const AIMonitoringSnapshotsPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery<AIMonitoringSnapshot[]>({
    queryKey: ['ai-monitoring'],
    queryFn: getAIMonitoringSnapshots,
    retry: 0,
  });

  const snapshots: AIMonitoringSnapshot[] =
    data && data.length
      ? data
      : [
          {
            id: 'snap1',
            module: 'AUTO_GRADING',
            mismatchRate: 0.12,
            overrideRate: 0.08,
            hallucinationRate: 0.03,
            timestamp: '2025-11-20T10:00:00Z',
          },
          {
            id: 'snap2',
            module: 'RISK_DETECTION',
            mismatchRate: 0.2,
            overrideRate: 0.15,
            hallucinationRate: 0.05,
            timestamp: '2025-11-20T10:00:00Z',
          },
        ];

  const chartData = snapshots.map((s) => ({
    module: s.module,
    mismatch: Math.round(s.mismatchRate * 100),
    override: Math.round(s.overrideRate * 100),
    hallucination: Math.round(s.hallucinationRate * 100),
  }));

  return (
    <>
      <PageHeader
        title="AI Monitoring Snapshots"
        subtitle="Live health metrics of AI modules."
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Mismatch Rate (%)"
            data={chartData}
            xKey="module"
            yKey="mismatch"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Override Rate (%)"
            data={chartData}
            xKey="module"
            yKey="override"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChartCard
            title="Hallucination Rate (%)"
            data={chartData}
            xKey="module"
            yKey="hallucination"
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              {isLoading && <Typography>Loading snapshots…</Typography>}
              {isError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  Backend not ready yet. Showing sample metrics.
                </Typography>
              )}

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Module</TableCell>
                    <TableCell>Mismatch %</TableCell>
                    <TableCell>Override %</TableCell>
                    <TableCell>Hallucination %</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {snapshots.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.module}</TableCell>
                      <TableCell>{Math.round(s.mismatchRate * 100)}</TableCell>
                      <TableCell>{Math.round(s.overrideRate * 100)}</TableCell>
                      <TableCell>{Math.round(s.hallucinationRate * 100)}</TableCell>
                      <TableCell>{s.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AIMonitoringSnapshotsPage;
