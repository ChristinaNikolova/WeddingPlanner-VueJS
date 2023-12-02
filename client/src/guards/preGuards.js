import { useAuthStore } from '../store/auth';

export function isUser() {
  const userStore = useAuthStore();
  return userStore.isAuthenticated ? userStore.isAuthenticated : { path: '/login' };
};

export function isGuest() {
  const userStore = useAuthStore();
  return userStore.isAuthenticated ? { path: '/' } : undefined;
};

export function isAdmin() {
  const userStore = useAuthStore();
  return userStore.isAdmin ? userStore.isAdmin : { path: '/' };
};
