import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
      id: '',
      accessToken: '',
      email: '',
    };
  },
  actions: {
    userLogin(userData) {
      this.id = userData._id;
      this.email = userData.email;
      this.accessToken = userData.accessToken;
      this.setSessionStorage('id', this.id);
      this.setSessionStorage('email', this.email);
      this.setSessionStorage('accessToken', this.accessToken);
      this.isAuthenticated = true;
    },
    userLogout() {
      this.id = '';
      this.email = '';
      this.accessToken = '';
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('accessToken');
      this.isAuthenticated = false;
    },
    setSessionStorage(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  },
});
