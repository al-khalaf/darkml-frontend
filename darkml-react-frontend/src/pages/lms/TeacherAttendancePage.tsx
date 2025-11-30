import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Typography,
  TableContainer,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

// Mock students
const mockStudents = [
  { id: 's1', name: 'Alice' },
  { id: 's2', name: 'Bob' },
  { id: 's3', name: 'Charlie' },
];

const TeacherAttendancePage: React.FC = () => {
  const { courseId } = useParams();
  const [attendance, setAttendance] = React.useState<Record<string, string>>({});

  const getStatusForStudent = (studentId: string) =>
    attendance[studentId] ?? 'PRESENT';

  const handleChange = (studentId: string, value: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSave = () => {
    console.log('Saving attendance for', courseId, attendance);
  };

  const presentCount = mockStudents.filter(
    (s) => getStatusForStudent(s.id) === 'PRESENT'
  ).length;
  const absentCount = mockStudents.filter(
    (s) => getStatusForStudent(s.id) === 'ABSENT'
  ).length;
  const lateCount = mockStudents.filter(
    (s) => getStatusForStudent(s.id) === 'LATE'
  ).length;

  return (
    <>
      <PageHeader
        title="Mark Attendance"
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
                Today&apos;s Attendance
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 520 }}
              >
                Set present, absent, or late for each student in this course. Changes
                are local until you save.
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
                variant="outlined"
                color="success"
              />
              <Chip
                size="small"
                label={`${absentCount} absent`}
                variant="outlined"
                color="error"
              />
              <Chip
                size="small"
                label={`${lateCount} late`}
                variant="outlined"
                color="warning"
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
                  <TableCell>Attendance</TableCell>
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
                    <TableCell>
                      <RadioGroup
                        row
                        value={getStatusForStudent(s.id)}
                        onChange={(e) => handleChange(s.id, e.target.value)}
                      >
                        <FormControlLabel
                          value="PRESENT"
                          control={<Radio size="small" />}
                          label="Present"
                        />
                        <FormControlLabel
                          value="ABSENT"
                          control={<Radio size="small" />}
                          label="Absent"
                        />
                        <FormControlLabel
                          value="LATE"
                          control={<Radio size="small" />}
                          label="Late"
                        />
                      </RadioGroup>
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
              Save attendance (mock)
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 420 }}
            >
              This is a mock attendance page. Connect this workflow to the attendance
              API to persist daily records.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherAttendancePage;
