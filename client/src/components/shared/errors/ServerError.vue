<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<template>
  <div class="server-error-wrapper error-message">
    <div v-for="(e, i) in errors" :key="i" class="server-error">
      {{ e.msg }}
    </div>
  </div>
</template>

<style scoped>
.server-error-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
  padding-top: 8px;
  padding-right: 20px;
}

.server-error {
  text-align: center;
  background-color: var(--clr-creme);
  color: var(--clr-gold);
  font-weight: 600;
  font-size: 22px;
  width: 30%;
  padding: 8px;
  -webkit-box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 0.22);
  box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 0.22);
  border-radius: 8px;
}
</style>
