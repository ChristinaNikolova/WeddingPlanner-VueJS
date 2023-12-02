<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../../store/auth';
import authService from '../../services/auth';

export default {
  created() {
    authService.logout()
      .then(() => {
        this.userLogout();
        this.$router.push({ path: '/' });
      })
      .catch(err => console.error(err));
  },
  methods: {
    ...mapActions(useAuthStore, ['userLogout']),
  },
};
</script>

<template>
  <div />
</template>
