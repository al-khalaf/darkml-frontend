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
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { getAIModuleStates, updateAIModuleState } from '../../api/governanceApi';
import type { AIModuleState } from '../../types/models';

type Mode = 'AUTO' | 'ASSISTED' | 'OFF';

const AIModuleStatePage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<AIModuleState[]>({
    queryKey: ['ai-modules'],
    queryFn: getAIModuleStates,
    // until backend exists, it's fine if this errors
    retry: 0,
  });

  const [localState, setLocalState] = React.useState<Record<string, AIModuleState>>({});

  React.useEffect(() => {
    if (data) {
      const mapped: Record<string, AIModuleState> = {};
      data.forEach((m) => {
        mapped[m.id] = { ...m };
      });
      setLocalState(mapped);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload: { id: string; state: Partial<AIModuleState> }) =>
      updateAIModuleState(payload.id, payload.state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-modules'] });
    },
  });

  const handleModeChange = (id: string, mode: Mode) => {
    setLocalState((prev) => ({
      ...prev,
      [id]: { ...prev[id], mode },
    }));
  };

  const handleThresholdChange = (id: string, key: string, value: string) => {
    const num = Number(value);
    setLocalState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        thresholds: {
          ...prev[id].thresholds,
          [key]: isNaN(num) ? 0 : num,
        },
      },
    }));
  };

  const handleSave = (id: string) => {
    const state = localState[id];
    mutation.mutate({
      id,
      state: {
        mode: state.mode,
        thresholds: state.thresholds,
      },
    });
  };

  const modules: AIModuleState[] =
    data && data.length
      ? data
      : [
          {
            id: 'AUTO_GRADING',
            moduleName: 'AUTO_GRADING',
            mode: 'ASSISTED',
            thresholds: { riskThreshold: 0.7 },
          },
          {
            id: 'MASTERY_TAGGING',
            moduleName: 'MASTERY_TAGGING',
            mode: 'AUTO',
            thresholds: { confidence: 0.8 },
          },
        ];

  return (
    <>
      <PageHeader
        title="AI Module States"
        subtitle="Control modes and thresholds for AI modules."
      />

      <Card>
        <CardContent>
          {isLoading && <Typography>Loading module states…</Typography>}
          {isError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Could not load from backend yet. Showing defaults.
            </Typography>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Thresholds</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((m) => {
                const state = localState[m.id] || m;
                const thresholds = state.thresholds || {};
                const entries = Object.entries(thresholds);
                if (entries.length === 0) {
                  entries.push(['riskThreshold', 0.7]);
                }

                return (
                  <TableRow key={m.id}>
                    <TableCell>{state.moduleName}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={state.mode}
                        onChange={(e) =>
                          handleModeChange(m.id, e.target.value as Mode)
                        }
                      >
                        <MenuItem value="AUTO">AUTO</MenuItem>
                        <MenuItem value="ASSISTED">ASSISTED</MenuItem>
                        <MenuItem value="OFF">OFF</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {entries.map(([key, value]) => (
                          <TextField
                            key={key}
                            size="small"
                            label={key}
                            value={value}
                            onChange={(e) =>
                              handleThresholdChange(m.id, key, e.target.value)
                            }
                            sx={{ width: 120 }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleSave(m.id)}
                        disabled={mutation.isPending}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AIModuleStatePage;
