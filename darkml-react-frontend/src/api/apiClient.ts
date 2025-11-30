import axios from 'axios';
import { API_BASE_URL } from '../config/env';

let getAccessToken: () => string | null = () => null;
let refreshAuthToken: () => Promise<string | null> = async () => null;
let handleUnauthorized: () => void = () => {};

export const setAuthHandlers = (
  getTokenFn: () => string | null,
  refreshFn: () => Promise<string | null>,
  unauthorizedFn?: () => void
) => {
  getAccessToken = getTokenFn;
  refreshAuthToken = refreshFn;
  handleUnauthorized = unauthorizedFn ?? (() => {});
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach access token
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle refresh logic
apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401) {
      if (!original._retry) {
        original._retry = true;
        const newToken = await refreshAuthToken();
        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(original);
        }
      }

      handleUnauthorized();
    }

    if (err.response?.status === 403) {
      handleUnauthorized();
    }

    return Promise.reject(err);
  }
);
