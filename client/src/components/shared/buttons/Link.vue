<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: 'Button',
    },
    path: {
      type: String,
      default: '/',
    },
  },
};
</script>

<template>
  <router-link :to="path" class="btn back-btn">
    {{ buttonText }}
  </router-link>
</template>

<style scoped>
.back-btn{
    display: inline-block;
    margin-top: 10px;
}
</style>
