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
