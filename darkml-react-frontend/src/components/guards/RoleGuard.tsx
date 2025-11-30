import React from 'react';
import AccessDenied from './AccessDenied';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../context/AuthContext';

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  roles,
  children,
  fallbackMessage,
  fallbackTitle,
}) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated || !hasRole(roles)) {
    return (
      <AccessDenied title={fallbackTitle} message={fallbackMessage} />
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
