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
      isLoading: true,
    };
  },
  async created() {
    await usersService
      .getFav()
      .then((res) => {
        this.favArticles = res;
        this.isLoading = false;
      })
      .catch(err => console.error(err));
  },
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section v-else class="fav-articles">
    <Jumbotron
      :path-to-image="pathToImage"
      :is-home-page="false"
    />
    <h4 class="fav-articles-title">
      Favourite Articles
    </h4>
    <List v-if="favArticles?.length" :articles="favArticles" />
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
