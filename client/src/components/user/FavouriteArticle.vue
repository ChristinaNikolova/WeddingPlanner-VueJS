<script>
import usersService from '../../services/users';
import { jumbo } from '../../utils/constants/image';

import Jumbotron from '../Jumbotron.vue';

export default {
  components: { Jumbotron },
  data() {
    return {
      pathToImage: jumbo.USER,
      favArticles: [],
    };
  },
  async mounted() {
    await usersService
      .getFav()
      .then(res => this.favArticles = res)
      .catch(err => console.error(err));
  },
};
</script>

<template>
  <section class="fav-articles">
    <Jumbotron
      :path-to-image="pathToImage"
      :is-home-page="false"
    />
    <h4 class="fav-articles-title">
      Favourite Articles
    </h4>
    <!-- todo fix this -->
    <!-- <ArticlesList
                articles={favArticles}
            /> -->
    <!-- todo fix this v-else -->
    <p class="empty empty-planner">
      No articles yet
    </p>
  </section>
</template>

<style scoped>
.fav-articles {
  margin: 0 auto;
  text-align: center;
}

.fav-articles-title {
  font-size: 46px;
  font-weight: 400;
  letter-spacing: 2.5px;
  margin-bottom: 150px;
}
</style>
