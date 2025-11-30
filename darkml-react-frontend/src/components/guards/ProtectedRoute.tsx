import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AccessDenied from './AccessDenied';
import type { UserRole } from '../../context/AuthContext';

interface Props {
  children: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const location = useLocation();
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !hasRole(roles)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
