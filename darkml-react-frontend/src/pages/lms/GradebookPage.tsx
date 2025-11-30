import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Box,
  Button,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

// Mock data
const mockStudents = [
  { id: 's1', name: 'Alice' },
  { id: 's2', name: 'Bob' },
  { id: 's3', name: 'Charlie' },
];

const mockAssessments = [
  { id: 'a1', title: 'Quiz 1' },
  { id: 'a2', title: 'Quiz 2' },
  { id: 'a3', title: 'Homework 1' },
];

const GradebookPage: React.FC = () => {
  const { courseId } = useParams();
  const [grades, setGrades] = React.useState<Record<string, string>>({});

  const handleChange = (
    studentId: string,
    assessmentId: string,
    value: string
  ) => {
    const key = `${studentId}:${assessmentId}`;
    setGrades((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Here you’d send grades to backend
    console.log('Saving grades', grades, 'for course', courseId);
  };

  const totalCells = mockStudents.length * mockAssessments.length;
  const filledCount = Object.values(grades).filter(
    (v) => v !== undefined && v !== ''
  ).length;

  return (
    <>
      <PageHeader
        title="Gradebook"
        subtitle={`Course ID: ${courseId ?? 'Unknown'}`}
      />

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
                Gradebook Matrix
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 520 }}
              >
                Enter or adjust scores per student and assessment. Changes are
                local until you save.
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
                label={`${mockStudents.length} students`}
                variant="outlined"
                color="primary"
              />
              <Chip
                size="small"
                label={`${mockAssessments.length} assessments`}
                variant="outlined"
              />
              <Chip
                size="small"
                label={`${filledCount}/${totalCells} cells filled`}
                variant="outlined"
                color={filledCount === totalCells ? 'success' : 'warning'}
              />
            </Stack>
          </Box>

          <Divider
            sx={{
              borderColor: 'rgba(148,163,184,0.4)',
              mb: 0.5,
            }}
          />

          <TableContainer
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(55,65,81,0.9)',
              overflow: 'hidden',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  {mockAssessments.map((a) => (
                    <TableCell key={a.id} align="center">
                      {a.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mockStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {s.name}
                    </TableCell>
                    {mockAssessments.map((a) => {
                      const key = `${s.id}:${a.id}`;
                      return (
                        <TableCell key={a.id} align="center">
                          <TextField
                            size="small"
                            variant="outlined"
                            value={grades[key] ?? ''}
                            onChange={(e) =>
                              handleChange(s.id, a.id, e.target.value)
                            }
                            sx={{
                              '& .MuiOutlinedInput-input': {
                                textAlign: 'center',
                                px: 1,
                                py: 0.5,
                              },
                              maxWidth: 80,
                            }}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              mt: 1.5,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                alignSelf: { xs: 'stretch', sm: 'flex-start' },
              }}
            >
              Save grades (mock)
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 420 }}
            >
              This is a mock gradebook. Wire this view into the backend gradebook
              API to persist scores.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default GradebookPage;
