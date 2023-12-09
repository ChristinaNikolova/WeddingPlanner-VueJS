<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import authService from '../../services/auth';

const store = useAuthStore();
const router = useRouter();

onMounted(() => {
  authService.logout()
    .then(() => {
      store.userLogout();
      router.push({ path: '/' });
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <div />
</template>
