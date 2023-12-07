<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Button',
  },
  path: {
    type: String,
    default: '/',
  },
});
</script>

<template>
  <router-link :to="props.path" class="btn back-btn">
    {{ props.buttonText }}
  </router-link>
</template>

<style scoped>
.back-btn{
    display: inline-block;
    margin-top: 10px;
}
</style>
