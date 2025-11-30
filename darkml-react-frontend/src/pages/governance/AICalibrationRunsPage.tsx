import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { getAICalibrationRuns } from '../../api/governanceApi';
import type { AICalibrationRun } from '../../types/models';

const AICalibrationRunsPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery<AICalibrationRun[]>({
    queryKey: ['ai-calibration'],
    queryFn: getAICalibrationRuns,
    retry: 0,
  });

  const runs: AICalibrationRun[] =
    data && data.length
      ? data
      : [
          {
            id: 'run1',
            module: 'AUTO_GRADING',
            phase: 'Q1-2025',
            alignment: 0.86,
            consistency: 0.9,
            passed: true,
          },
          {
            id: 'run2',
            module: 'RISK_DETECTION',
            phase: 'Q1-2025',
            alignment: 0.72,
            consistency: 0.8,
            passed: false,
          },
        ];

  return (
    <>
      <PageHeader
        title="AI Calibration Runs"
        subtitle="Monitor calibration quality across AI modules."
      />

      <Card>
        <CardContent>
          {isLoading && <Typography>Loading calibration runs…</Typography>}
          {isError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Backend not ready yet. Showing sample runs.
            </Typography>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell>Phase</TableCell>
                <TableCell>Alignment</TableCell>
                <TableCell>Consistency</TableCell>
                <TableCell>Passed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runs.map((run) => (
                <TableRow key={run.id}>
                  <TableCell>{run.module}</TableCell>
                  <TableCell>{run.phase}</TableCell>
                  <TableCell>{Math.round(run.alignment * 100)}%</TableCell>
                  <TableCell>{Math.round(run.consistency * 100)}%</TableCell>
                  <TableCell>
                    <Chip
                      label={run.passed ? 'Passed' : 'Failed'}
                      color={run.passed ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AICalibrationRunsPage;
