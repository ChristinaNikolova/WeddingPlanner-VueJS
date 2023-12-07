<script setup>
import { onMounted, ref } from 'vue';
import LastThreeArticles from './shared/Blog/LastThreeArticles.vue';

const homeRef = ref(null);

onMounted(() => {
  homeRef.value.scrollIntoView({ behavior: 'instant', block: 'start' });
});
</script>

<template>
  <section ref="homeRef" class="home">
    <Jumbotron :is-home-page="true" />
    <div class="home-content-wrapper">
      <h2 class="home-title">
        ELEGANTLY DESIGNED · ECLECTICALLY CURATED · IMPECCABLY PLANNED
      </h2>
      <p class="home-content">
        Because planning the biggest day of your life is only the beginning of
        your adventure
      </p>
      <router-link to="/plan" class="btn">
        Start planning
      </router-link>
    </div>
    <LastThreeArticles />
  </section>
</template>

<style scoped>
.home-content-wrapper {
  text-align: center;
}

.home-title {
  font-size: 28px;
  font-weight: 300;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.home-content {
  font-size: 24px;
  letter-spacing: 0.5px;
  line-height: 1.5;
  margin-bottom: 40px;
}

@media screen and (max-width: 1100px) {
  .home-content-wrapper {
    padding-right: 30px;
    padding-left: 30px;
  }
}
</style>
