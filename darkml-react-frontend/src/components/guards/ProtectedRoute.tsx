import React from 'react';

interface Props {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  // TEMPORARY — BYPASS AUTH ENTIRELY
  return <>{children}</>;
};

export default ProtectedRoute;
