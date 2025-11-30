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
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { getAIIncidents } from '../../api/governanceApi';
import type { AIIncident } from '../../types/models';

const severityColor = (s: AIIncident['severity']) => {
  switch (s) {
    case 'LOW':
      return 'default';
    case 'MEDIUM':
      return 'warning';
    case 'HIGH':
      return 'error';
    case 'CRITICAL':
      return 'error';
    default:
      return 'default';
  }
};

const statusColor = (s: AIIncident['status']) => {
  switch (s) {
    case 'OPEN':
      return 'error';
    case 'INVESTIGATING':
      return 'warning';
    case 'RESOLVED':
      return 'success';
    default:
      return 'default';
  }
};

const AIIncidentsPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery<AIIncident[]>({
    queryKey: ['ai-incidents'],
    queryFn: getAIIncidents,
    retry: 0,
  });

  const [selected, setSelected] = React.useState<AIIncident | null>(null);

  const incidents: AIIncident[] =
    data && data.length
      ? data
      : [
          {
            id: 'inc1',
            severity: 'HIGH',
            status: 'OPEN',
            title: 'Biased grading in Algebra',
            description: 'AI giving lower scores to certain demographic segment.',
            createdAt: '2025-11-20',
          },
        ];

  React.useEffect(() => {
    if (!selected && incidents.length > 0) {
      setSelected(incidents[0]);
    }
  }, [incidents, selected]);

  return (
    <>
      <PageHeader
        title="AI Incidents"
        subtitle="Track and review AI incident reports."
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          {isLoading && <Typography>Loading incidents…</Typography>}
          {isError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Backend not ready yet. Showing sample incident.
            </Typography>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((inc) => (
                <TableRow
                  key={inc.id}
                  hover
                  selected={selected?.id === inc.id}
                  onClick={() => setSelected(inc)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{inc.createdAt}</TableCell>
                  <TableCell>{inc.title}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={inc.severity}
                      color={severityColor(inc.severity) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={inc.status}
                      color={statusColor(inc.status) as any}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Incident Details
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {selected.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Created: {selected.createdAt}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {selected.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIIncidentsPage;
