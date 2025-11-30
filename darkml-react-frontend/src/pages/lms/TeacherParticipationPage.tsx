import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  Button,
  Typography,
  TableContainer,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { getCourseById } from '../../data/lmsData';

// Mock students
const mockStudents = [
  { id: 's1', name: 'Alice' },
  { id: 's2', name: 'Bob' },
  { id: 's3', name: 'Charlie' },
];

const TeacherParticipationPage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = React.useMemo(() => getCourseById(courseId), [courseId]);
  const [scores, setScores] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (courseId && !course) {
      navigate('/lms/courses', {
        replace: true,
        state: { missingCourseId: courseId },
      });
    }
  }, [course, courseId, navigate]);

  if (!course) {
    return null;
  }

  const handleChange = (studentId: string, value: string) => {
    setScores((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSave = () => {
    console.log('Saving participation for', courseId, scores);
  };

  const totalStudents = mockStudents.length;
  const filledScores = Object.values(scores).filter(
    (v) => v !== undefined && v.trim() !== ''
  ).length;

  return (
    <>
      <PageHeader
        title="Record Participation"
        subtitle={`${course.name} (${course.code}) • Log in-class engagement scores for each student.`}
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
                Participation Scores
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 520 }}
              >
                Capture quick participation scores (e.g. 0–10 scale) for today&apos;s
                session. Values are local until you save.
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
                label={`${filledScores} scored`}
                variant="outlined"
                color={
                  filledScores === totalStudents
                    ? 'success'
                    : filledScores > 0
                    ? 'warning'
                    : 'default'
                }
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
                  <TableCell align="center">Participation score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockStudents.map((s) => (
                  <TableRow
                    key={s.id}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {s.name}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={scores[s.id] ?? ''}
                        onChange={(e) => handleChange(s.id, e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            textAlign: 'center',
                            px: 1,
                            py: 0.5,
                          },
                          maxWidth: 90,
                        }}
                        placeholder="0–10"
                      />
                    </TableCell>
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
              Save participation (mock)
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 420 }}
            >
              This is a mock participation page. Connect this flow to the
              Participation API to persist data to your gradebook and analytics.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherParticipationPage;
