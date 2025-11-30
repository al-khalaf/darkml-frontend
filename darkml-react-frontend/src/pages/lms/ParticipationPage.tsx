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
const mockParticipation = [
  { id: '1', course: 'Algebra I', date: '2025-11-10', score: 8 },
  { id: '2', course: 'Biology', date: '2025-11-11', score: 6 },
  { id: '3', course: 'Algebra I', date: '2025-11-12', score: 9 },
];

const ParticipationPage: React.FC = () => {
  const totalSessions = mockParticipation.length;
  const avgScore =
    totalSessions === 0
      ? 0
      : mockParticipation.reduce((sum, row) => sum + row.score, 0) /
        totalSessions;
  const highScore =
    totalSessions === 0
      ? 0
      : Math.max(...mockParticipation.map((row) => row.score));

  return (
    <>
      <PageHeader
        title="Participation"
        subtitle="Your participation scores per course and date."
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
                    Participation Sessions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 480 }}
                  >
                    Logged participation scores across your courses. Higher scores
                    indicate stronger in-class engagement.
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
                    label={`${totalSessions} sessions`}
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label={`Avg score: ${avgScore.toFixed(1)}/10`}
                    variant="outlined"
                    color={avgScore >= 7 ? 'success' : 'warning'}
                  />
                  <Chip
                    size="small"
                    label={`Best: ${highScore}/10`}
                    variant="outlined"
                    color="success"
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
                      <TableCell align="right">Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockParticipation.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            borderBottom: 'none',
                          },
                          backgroundColor:
                            row.score >= 8
                              ? 'rgba(34,197,94,0.06)'
                              : row.score <= 5
                              ? 'rgba(248,113,113,0.06)'
                              : 'transparent',
                        }}
                      >
                        <TableCell>{row.course}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: row.score >= 8 ? 600 : 400,
                              color:
                                row.score >= 8
                                  ? 'success.light'
                                  : row.score <= 5
                                  ? 'error.light'
                                  : 'text.primary',
                            }}
                          >
                            {row.score}/10
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default ParticipationPage;
