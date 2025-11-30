import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin } from '../api/authApi';

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
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
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
  }, [accessToken, refreshToken]);

  const login = useCallback(async (username: string, password: string) => {
    const res = await apiLogin({ username, password });

    setUser(res.user);
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('dm_access_token');
    localStorage.removeItem('dm_refresh_token');
  }, []);

  const value: AuthContextValue = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken && !!user,
  };
useEffect(() => {
  if (!user) {
    setUser({
      id: '1',
      name: 'Ibrahim Al Mubarak',
      role: 'TEACHER',
    });
  }
}, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
