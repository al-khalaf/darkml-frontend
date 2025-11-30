import { useAuth } from './useAuth';

export const useRoleGuard = (roles: string[]) => {
  const { user } = useAuth();
  if (!user) return false;
  return roles.includes(user.role);
};
