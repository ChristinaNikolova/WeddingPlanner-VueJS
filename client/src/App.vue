<script>
import AppHeader from './components/header/AppHeader.vue';

export default {
  components: { AppHeader },
};
</script>

<template>
  <AppHeader />
  <router-view />
</template>
