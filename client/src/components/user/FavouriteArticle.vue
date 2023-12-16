<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usersService from '../../services/users';
import { jumbo } from '../../utils/constants/image';
import form from '../../utils/helpers/form';
import List from '../blog/List.vue';
import { directions } from '../../utils/constants/global';
import Pagination from '../shared/Pagination.vue';

const pathToImage = jumbo.USER;
const route = useRoute();
const router = useRouter();
const currentPage = ref(route?.query?.page ? Number(route.query.page) : 1);
const pagesCount = ref(1);
const favArticles = ref([]);
const isLoading = ref(true);

onMounted(() => {
  loadFavArticles();
});

watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadFavArticles();
    getNewQuery();
  }
});

watch(route, (newValue) => {
  if (newValue.fullPath === '/user/favourite-article?page=1') {
    currentPage.value = 1;
    getNewQuery();
    loadFavArticles();
  }
});

function onPaginationHandler(direction) {
  const value = direction === directions.PREV ? -1 : 1;
  currentPage.value = currentPage.value + value;
  form.scrollToTop();
};

function getNewQuery() {
  router.push(`/user/favourite-article?page=${currentPage.value}`);
};

function loadFavArticles() {
  usersService
    .getFav(currentPage.value)
    .then((res) => {
      favArticles.value = res.articles;
      currentPage.value = Number(res.currentPage);
      pagesCount.value = res.pagesCount;
      isLoading.value = false;
      form.scrollToTop();
    })
    .catch(err => console.error(err));
}
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
    <Pagination
      v-if="favArticles.length"
      :current-page="currentPage"
      :pages-count="pagesCount"
      url="/user/favourite-article"
      @on-click-handler="onPaginationHandler"
    />
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
