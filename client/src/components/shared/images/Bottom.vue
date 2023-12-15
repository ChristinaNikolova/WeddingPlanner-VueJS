<script setup>
import { bottom } from '../../../utils/constants/image';

const props = defineProps({
  first: {
    type: String,
    default: bottom.FIRST,
  },
  second: {
    type: String,
    default: bottom.SECOND,
  },
  third: {
    type: String,
    default: bottom.THIRD,
  },
});
</script>

<template>
  <div class="bottom-img-wrapper">
    <img
      class="bottom-img img img-shadow"
      :src="`/img/${props.first}`"
      alt="wedding_image"
    >
    <img
      class="bottom-img img img-shadow"
      :src="`/img/${props.second}`"
      alt="wedding_image"
    >
    <img
      class="bottom-img img img-shadow"
      :src="`/img/${props.third}`"
      alt="wedding_image"
    >
  </div>
</template>

<style scoped>
.bottom-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 40px;
  margin-bottom: 40px;
}

.bottom-img {
  max-width: 30%;
  max-height: 20%;
}

@media screen and (max-width: 800px) {
  .bottom-img-wrapper {
    flex-direction: column;
    gap: 12px;
  }
}

@media screen and (max-width: 600px) {
  .bottom-img-wrapper {
    display: none;
  }
}
</style>
