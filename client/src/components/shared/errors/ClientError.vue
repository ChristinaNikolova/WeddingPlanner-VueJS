<script>
import { global } from '../../../utils/constants/error';

export default {
  props: {
    error: {
      type: String,
      required: true,
      default: global.DEFAULT,
    },
  },
};
</script>

<template>
  <p class="client-error">
    {{ error }}
  </p>
</template>

<style  scoped>
.client-error {
  color: var(--clr-gold);
  font-weight: 600;
  font-size: 20px;
}
</style>
