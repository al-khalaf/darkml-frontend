import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Divider,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

// Mock data
const mockAttendance = [
  { id: '1', course: 'Algebra I', date: '2025-11-10', status: 'PRESENT' },
  { id: '2', course: 'Biology', date: '2025-11-11', status: 'ABSENT' },
  { id: '3', course: 'Algebra I', date: '2025-11-12', status: 'LATE' },
];

const AttendancePage: React.FC = () => {
  const presentCount = mockAttendance.filter((r) => r.status === 'PRESENT').length;
  const absentCount = mockAttendance.filter((r) => r.status === 'ABSENT').length;
  const lateCount = mockAttendance.filter((r) => r.status === 'LATE').length;

  const getStatusConfig = (
    status: string
  ): { label: string; color: 'success' | 'error' | 'warning' } => {
    switch (status) {
      case 'PRESENT':
        return { label: 'Present', color: 'success' };
      case 'ABSENT':
        return { label: 'Absent', color: 'error' };
      case 'LATE':
      default:
        return { label: 'Late', color: 'warning' };
    }
  };

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="Your attendance records across courses."
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
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
                    Attendance Records
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 480 }}
                  >
                    Daily attendance events by course. Use this view to verify your
                    record across the term.
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
                    label={`${presentCount} present`}
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${absentCount} absent`}
                    color="error"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${lateCount} late`}
                    color="warning"
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

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockAttendance.map((row) => {
                      const config = getStatusConfig(row.status);

                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              borderBottom: 'none',
                            },
                            backgroundColor:
                              row.status === 'ABSENT'
                                ? 'rgba(248,113,113,0.08)'
                                : row.status === 'LATE'
                                ? 'rgba(250,204,21,0.06)'
                                : 'transparent',
                          }}
                        >
                          <TableCell>{row.course}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>
                            <Chip
                              label={config.label}
                              color={config.color}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendancePage;
