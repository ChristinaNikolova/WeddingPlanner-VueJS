<script>
import { bottom } from '../../../utils/constants/images';

export default {
  props: {
    first: {
      type: String,
      required: true,
      default: bottom.FIRST,
    },
    second: {
      type: String,
      required: true,
      default: bottom.FIRST,
    },
    third: {
      type: String,
      required: true,
      default: bottom.FIRST,
    },
  },
};
</script>

<template>
  <div class="bottom-img-wrapper">
    <img
      class="bottom-img img img-shadow"
      :src="`./../../../img/${first}`"
      alt="wedding_image"
    >
    <img
      class="bottom-img img img-shadow"
      :src="`./../../../img/${second}`"
      alt="wedding_image"
    >
    <img
      class="bottom-img img img-shadow"
      :src="`./../../../img/${third}`"
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
