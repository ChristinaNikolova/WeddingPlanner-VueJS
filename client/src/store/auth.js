import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      userId: '',
      accessToken: '',
      email: '',
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
    },
    userLogin(userData) {
      this.userId = userData._id;
      this.email = userData.email;
      this.accessToken = userData.accessToken;
      this.setSessionStorage('userId', this.userId);
      this.setSessionStorage('email', this.email);
      this.setSessionStorage('accessToken', this.accessToken);
      this.isAuthenticated = true;
    },
    userLogout() {
      this.userId = '';
      this.email = '';
      this.accessToken = '';
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('accessToken');
      this.isAuthenticated = false;
    },
    setSessionStorage(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  },
});
