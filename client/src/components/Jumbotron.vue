<script setup>
import { jumbo } from '../utils/constants/image.js';

const props = defineProps({
  pathToImage: {
    type: String,
    default: jumbo.HOME,
  },
  isHomePage: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="jumbo" :style="{ 'background-image': `url(${props.pathToImage})` }">
    <div v-if="props.isHomePage" class="jumbo-title-wrapper">
      <h4 class="jumbo-sub-title">
        It's time to &hellip;
      </h4>
      <h1 class="jumbo-main-title">
        plan your wedding
      </h1>
    </div>
  </section>
</template>

<style scoped>
.jumbo {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 80vh;
  position: relative;
  margin-bottom: 120px;
}

.jumbo-title-wrapper {
  width: 100%;
  letter-spacing: 2.5px;
  text-shadow: 4px 1px 15px rgba(0, 0, 0, 0.75);
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
}

.jumbo-sub-title {
  font-weight: 400;
  font-size: 40px;
  margin-bottom: 10px;
}

.jumbo-main-title {
  font-weight: 300;
  font-size: 70px;
}

@media screen and (max-width: 950px) {
  .jumbo-sub-title {
    font-size: 36px;
  }

  .jumbo-main-title {
    font-size: 60px;
  }
}

@media screen and (max-width: 750px) {
  .jumbo-sub-title {
    font-size: 30px;
  }

  .jumbo-main-title {
    font-size: 50px;
  }
}

@media screen and (max-width: 600px) {
  .jumbo-title-wrapper {
    padding-right: 30px;
    padding-left: 30px;
  }

  .jumbo-sub-title {
    font-size: 24px;
  }

  .jumbo-main-title {
    font-size: 36px;
  }
}
</style>
