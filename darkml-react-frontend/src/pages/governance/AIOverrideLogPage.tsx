import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { getAIOverrideLogs } from '../../api/governanceApi';
import type { AIOverrideLogEntry } from '../../types/models';

const PAGE_SIZE = 10;

const AIOverrideLogPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [severity, setSeverity] = React.useState<string>('ALL');

  const { data, isLoading, isError } = useQuery<{
    results: AIOverrideLogEntry[];
    total: number;
  }>({
    queryKey: ['ai-overrides', page, severity, search],
    queryFn: () => getAIOverrideLogs(page, PAGE_SIZE),
    retry: 0,
  });

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const filtered = (data?.results ?? []).filter((row) => {
    if (severity !== 'ALL' && row.severity !== severity) return false;
    if (
      search &&
      !`${row.module} ${row.studentId} ${row.teacherId} ${row.reason}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <PageHeader
        title="AI Override Log"
        subtitle="Review where teachers overrode AI decisions."
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              size="small"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <MenuItem value="ALL">All severities</MenuItem>
              <MenuItem value="LOW">LOW</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HIGH">HIGH</MenuItem>
              <MenuItem value="CRITICAL">CRITICAL</MenuItem>
            </Select>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {isLoading && <Typography>Loading override logs…</Typography>}
          {isError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Backend not ready yet. Showing empty table.
            </Typography>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body2" color="text.secondary">
                      No override log entries.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.module}</TableCell>
                  <TableCell>{row.studentId}</TableCell>
                  <TableCell>{row.teacherId}</TableCell>
                  <TableCell>{row.severity}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2">
              Page {page} of {pages} (total {total})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                size="small"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AIOverrideLogPage;
