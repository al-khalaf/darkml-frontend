import { apiClient } from './apiClient';
import type { AuthUser } from '../context/AuthContext';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const res = await apiClient.post('/api/auth/login', payload);
  return res.data;
};

export const refreshToken = async (
  token: string
): Promise<{ accessToken: string }> => {
  const res = await apiClient.post('/api/auth/refresh', { refreshToken: token });
  return res.data;
};
