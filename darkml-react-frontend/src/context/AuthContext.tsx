import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, refreshToken as apiRefreshToken } from '../api/authApi';
import { setAuthHandlers } from '../api/apiClient';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  division?: string; // for admins
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles?: UserRole | UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('dm_user');
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('dm_access_token')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('dm_refresh_token')
  );

  // Persist tokens
  useEffect(() => {
    if (accessToken) localStorage.setItem('dm_access_token', accessToken);
    else localStorage.removeItem('dm_access_token');

    if (refreshToken) localStorage.setItem('dm_refresh_token', refreshToken);
    else localStorage.removeItem('dm_refresh_token');

    if (user) localStorage.setItem('dm_user', JSON.stringify(user));
    else localStorage.removeItem('dm_user');
  }, [accessToken, refreshToken, user]);

  const performLogout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('dm_access_token');
    localStorage.removeItem('dm_refresh_token');
    localStorage.removeItem('dm_user');
  }, []);

  const logout = useCallback(() => {
    performLogout();
    navigate('/login');
  }, [navigate, performLogout]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return null;

    try {
      const res = await apiRefreshToken(refreshToken);
      setAccessToken(res.accessToken);
      return res.accessToken;
    } catch (error) {
      performLogout();
      return null;
    }
  }, [performLogout, refreshToken]);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await apiLogin({ username, password });

      setUser(res.user);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
    },
    []
  );

  const hasRole = useCallback(
    (roles?: UserRole | UserRole[]) => {
      if (!roles) return true;
      const required = Array.isArray(roles) ? roles : [roles];
      return !!user && required.includes(user.role);
    },
    [user]
  );

  const handleUnauthorized = useCallback(() => {
    performLogout();
    navigate('/login', { replace: true });
  }, [navigate, performLogout]);

  useEffect(() => {
    setAuthHandlers(() => accessToken, refreshAccessToken, handleUnauthorized);
  }, [accessToken, refreshAccessToken, handleUnauthorized]);

  const value: AuthContextValue = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken && !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
