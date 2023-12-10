import { ref } from 'vue';
import { defineStore } from 'pinia';
import { emails } from '../utils/constants/global';
import useSessionStorage from '../composables/useSessionStorage';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    isAuthenticated: false,
    isAdmin: false,
    userId: useSessionStorage('userId', ''),
    accessToken: useSessionStorage('accessToken', ''),
    email: useSessionStorage('email', ''),
  });

  function getPersistedProfile() {
    if (!useSessionStorage('accessToken').value) {
      return;
    }

    user.value.userId = useSessionStorage('userId').value;
    user.value.accessToken = useSessionStorage('accessToken').value;
    user.value.email = useSessionStorage('email').value;
    user.value.isAuthenticated = true;
    user.value.isAdmin = user.value.email === emails.ADMIN;
  };

  function userLogin(userData) {
    user.value.userId = userData._id;
    user.value.email = userData.email;
    user.value.accessToken = userData.accessToken;
    user.value.isAuthenticated = true;
    user.value.isAdmin = user.value.email === emails.ADMIN;
  };

  function userLogout() {
    user.value.userId = '';
    user.value.email = '';
    user.value.accessToken = '';
    user.value.isAuthenticated = false;
    user.value.isAdmin = false;
  };

  return {
    user,
    getPersistedProfile,
    userLogin,
    userLogout,
  };
});
