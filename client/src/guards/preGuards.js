import { useAuthStore } from '../store/auth';

export function isUser() {
  const store = useAuthStore();
  return store.user.isAuthenticated ? store.user.isAuthenticated : { path: '/login' };
};

export function isGuest() {
  const store = useAuthStore();
  return store.user.isAuthenticated ? { path: '/' } : undefined;
};

export function isAdmin() {
  const store = useAuthStore();
  return store.user.isAdmin ? store.user.isAdmin : { path: '/' };
};
