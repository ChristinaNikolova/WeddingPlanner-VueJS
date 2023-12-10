import { ref } from 'vue';
import { defineStore } from 'pinia';
import { emails } from '../utils/constants/global';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    isAuthenticated: false,
    isAdmin: false,
    userId: '',
    accessToken: '',
    email: '',
  });

  function getPersistedProfile() {
    if (!sessionStorage.getItem('accessToken')) {
      return;
    }

    user.value.userId = JSON.parse(sessionStorage.getItem('userId'));
    user.value.accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    user.value.email = JSON.parse(sessionStorage.getItem('email'));
    user.value.isAuthenticated = true;
    user.value.isAdmin = user.value.email === emails.ADMIN;
  };

  function userLogin(userData) {
    user.value.userId = userData._id;
    user.value.email = userData.email;
    user.value.accessToken = userData.accessToken;
    setSessionStorage('userId', user.value.userId);
    setSessionStorage('email', user.value.email);
    setSessionStorage('accessToken', user.value.accessToken);
    user.value.isAuthenticated = true;
    user.value.isAdmin = user.value.email === emails.ADMIN;
  };

  function userLogout() {
    user.value.userId = '';
    user.value.email = '';
    user.value.accessToken = '';
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
    user.value.isAuthenticated = false;
    user.value.isAdmin = false;
  };

  function setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return {
    user,
    getPersistedProfile,
    userLogin,
    userLogout,
  };
});
