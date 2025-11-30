import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../hooks/useAuth';

const mockProfile = {
  gradeLevel: 'Grade 9',
  division: 'HS',
  courses: [
    { id: 'c1', name: 'Algebra I', teacher: 'Ms. Smith' },
    { id: 'c2', name: 'Biology', teacher: 'Dr. Brown' },
  ],
  attendanceRate: 94,
  participationScore: 8.2,
};

const divisionLabel: Record<string, string> = {
  HS: 'High School',
  MS: 'Middle School',
  ES: 'Elementary School',
};

const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        title="Student Profile"
        subtitle={`Profile overview for ${user?.name || 'student'}.`}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Grade Level"
            value={mockProfile.gradeLevel}
            helperText="Current academic year"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Division"
            value={divisionLabel[mockProfile.division] ?? mockProfile.division}
            helperText="School division"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Attendance Rate"
            value={`${mockProfile.attendanceRate}%`}
            helperText="Year-to-date attendance"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Participation (avg)"
            value={mockProfile.participationScore.toFixed(1)}
            helperText="Average engagement score"
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
                  <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                    Enrolled Courses
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', maxWidth: 480 }}
                  >
                    Classes you&apos;re currently enrolled in, with the primary
                    teacher for each course.
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
                    label={`${mockProfile.courses.length} active courses`}
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label={mockProfile.gradeLevel}
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

              <List dense disablePadding>
                {mockProfile.courses.map((c, i) => (
                  <ListItem
                    key={c.id}
                    disableGutters
                    sx={{
                      mb: 1.1,
                      px: 1.5,
                      py: 1.15,
                      borderRadius: 2,
                      border: '1px solid rgba(55,65,81,0.85)',
                      background:
                        i === 0
                          ? 'radial-gradient(circle at 0% 0%, rgba(129,140,248,0.32), transparent 55%), rgba(15,23,42,0.96)'
                          : 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      transition:
                        'background 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                      '&:hover': {
                        borderColor: 'rgba(96,165,250,0.9)',
                        boxShadow:
                          '0 14px 35px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        variant: 'subtitle1',
                        sx: { fontWeight: 500 },
                      }}
                      secondaryTypographyProps={{
                        variant: 'body2',
                        sx: { color: 'text.secondary' },
                      }}
                      primary={c.name}
                      secondary={`Teacher: ${c.teacher}`}
                    />
                    <Chip
                      size="small"
                      label="Enrolled"
                      variant="outlined"
                      color="success"
                      sx={{ flexShrink: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentProfilePage;
