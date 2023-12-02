<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/header/AppHeader.vue';

export default {
  components: { AppHeader, AppFooter },
};
</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>
