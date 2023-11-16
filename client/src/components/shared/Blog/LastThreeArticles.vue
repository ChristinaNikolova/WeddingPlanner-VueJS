<script>
import articlesService from '../../../services/articles';
import LastSingleArticle from './LastSingleArticle.vue';

export default {
  components: {
    LastSingleArticle,
  },
  data() {
    return {
      articles: [],
    };
  },
  async mounted() {
    await articlesService
      .getLastThree()
      .then(res => (this.articles = res))
      .catch(err => console.error(err));
  },
};
</script>

<template>
  <div class="last-three-articles-section-wrapper">
    <h3 class="last-three-artilces-title">
      Recent articles
    </h3>
    <div class="last-three-articles-wrapper">
      <LastSingleArticle
        v-for="article in articles"
        :id="article.id"
        :key="article.id"
        :title="article.title"
        :short-content="article.shortContent"
        :image="article.image"
      />
    </div>
  </div>
</template>

<style scoped>
.last-three-articles-section-wrapper {
  margin-top: 140px;
  margin-bottom: 140px;
}

.last-three-artilces-title {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 100px;
}

.last-three-articles-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 120px;
}

@media screen and (max-width: 2000px) {
  .last-three-articles-wrapper {
    gap: 60px;
    margin: 140px 50px;
  }
}

@media screen and (max-width: 1600px) {
  .last-three-articles-wrapper {
    gap: 30px;
  }
}

@media screen and (max-width: 1200px) {
  .last-three-articles-wrapper {
    flex-direction: column;
    gap: 60px;
  }
}
</style>
