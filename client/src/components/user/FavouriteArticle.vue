<script>
import usersService from '../../services/users';
import { jumbo } from '../../utils/constants/image';
import List from '../blog/List.vue';

export default {
  components: { List },
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
    <!-- todo test if this works without all props -->
    <!-- todo add ? -->
    <List v-if="articles?.length" :articles="articles" />
    <p v-else class="empty empty-planner">
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
