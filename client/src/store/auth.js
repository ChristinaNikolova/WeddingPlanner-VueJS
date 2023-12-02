import { defineStore } from 'pinia';
import { emails } from '../utils/constants/global';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      isAdmin: false,
      userId: '',
      accessToken: '',
      email: '',
      emails,
    };
  },
  actions: {
    getPersistedProfile() {
      if (!sessionStorage.getItem('accessToken')) {
        return;
      }

      this.userId = JSON.parse(sessionStorage.getItem('userId'));
      this.accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
      this.email = JSON.parse(sessionStorage.getItem('email'));
      this.isAuthenticated = true;
      this.isAdmin = this.email === this.emails.ADMIN;
    },
    userLogin(userData) {
      this.userId = userData._id;
      this.email = userData.email;
      this.accessToken = userData.accessToken;
      this.setSessionStorage('userId', this.userId);
      this.setSessionStorage('email', this.email);
      this.setSessionStorage('accessToken', this.accessToken);
      this.isAuthenticated = true;
      this.isAdmin = this.email === this.emails.ADMIN;
    },
    userLogout() {
      this.userId = '';
      this.email = '';
      this.accessToken = '';
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('accessToken');
      this.isAuthenticated = false;
      this.isAdmin = false;
    },
    setSessionStorage(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  },
});
