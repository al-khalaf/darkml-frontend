import { apiClient } from './apiClient';
import type {
  AIModuleState,
  AIOverrideLogEntry,
  AIIncident,
  AICalibrationRun,
  AIMonitoringSnapshot,
} from '../types/models';

export const getAIModuleStates = async (): Promise<AIModuleState[]> => {
  const res = await apiClient.get('/api/governance/modules');
  return res.data;
};

export const updateAIModuleState = async (
  id: string,
  payload: Partial<AIModuleState>
) => {
  const res = await apiClient.put(`/api/governance/modules/${id}`, payload);
  return res.data;
};

export const getAIOverrideLogs = async (
  page: number,
  pageSize: number
): Promise<{ results: AIOverrideLogEntry[]; total: number }> => {
  const res = await apiClient.get('/api/governance/overrides', {
    params: { page, pageSize },
  });
  return res.data;
};

export const getAIIncidents = async (): Promise<AIIncident[]> => {
  const res = await apiClient.get('/api/governance/incidents');
  return res.data;
};

export const getAICalibrationRuns = async (): Promise<AICalibrationRun[]> => {
  const res = await apiClient.get('/api/governance/calibration');
  return res.data;
};

export const getAIMonitoringSnapshots = async (): Promise<
  AIMonitoringSnapshot[]
> => {
  const res = await apiClient.get('/api/governance/monitoring');
  return res.data;
};
