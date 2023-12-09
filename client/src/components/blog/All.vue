<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { jumbo } from '../../utils/constants/image';
import { directions } from '../../utils/constants/global';
import articlesService from '../../services/articles';
import Pagination from '../shared/Pagination.vue';
import form from '../../utils/helpers/form';
import CategoryDropDown from './CategoryDropDown.vue';
import List from './List.vue';
import Search from './Search.vue';

const route = useRoute();
const router = useRouter();
const pathToImage = jumbo.BLOG;
const articles = ref([]);
const currentPage = ref(route?.query?.page ? Number(route.query.page) : 1);
const selectedCategory = ref({
  id: route?.query?.categoryId ? route.query.categoryId : 'default',
  name: route?.query?.category ? route.query.category : 'all',
});
const pagesCount = ref(1);
const isSearchIconClicked = ref(false);
const query = ref('');
const isSearched = ref(false);
const isLoading = ref(true);

onMounted(() => {
  loadArticles();
  form.scrollToTop();
});

watch(selectedCategory, (newValue, oldValue) => {
  if (newValue.id !== oldValue.id) {
    currentPage.value = 1;
    loadArticles();
    getNewQuery();
  }
});

watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadArticles();
    getNewQuery();
  }
});

watch(query, () => {
  currentPage.value = 1;
  loadArticles();
  getNewQuery();
});

watch(route, (newValue) => {
  if (newValue.fullPath === '/blog?page=1&category=all') {
    currentPage.value = 1;
    onSearchForm();
    onRemoveCategoryHandler();
    getNewQuery();
    loadArticles();
  }
});

function onPaginationHandler(direction) {
  const value = direction === directions.PREV ? -1 : 1;
  currentPage.value = currentPage.value + value;
  form.scrollToTop();
};

function onSearchForm() {
  isSearchIconClicked.value = !isSearchIconClicked.value;
  isSearched.value = false;
  query.value = '';
};

function onSearch(e, searchedQuery) {
  isSearched.value = true;
  query.value = searchedQuery;
};

function onCategoryHandler(e) {
  selectedCategory.value = {
    id: e.target.id,
    name: e.target.textContent,
  };
};

function onRemoveCategoryHandler() {
  selectedCategory.value = {
    id: 'default',
    name: 'all',
  };
};

function getNewQuery() {
  router.push(`/blog?page=${currentPage.value}&category=${selectedCategory.value.name}&categoryId=${selectedCategory.value.id}`);
};

function loadArticles() {
  articlesService
    .all(currentPage.value, selectedCategory.value.id, query.value)
    .then((data) => {
      articles.value = data.articles;
      currentPage.value = Number(data.currentPage);
      pagesCount.value = data.pagesCount;
      isSearched.value = false;
      isLoading.value = false;
    })
    .catch(err => console.error(err));
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section v-else class="articles-all">
    <Jumbotron
      :path-to-image="pathToImage"
      :is-home-page="false"
    />
    <div class="articles-all-title-wrapper">
      <h4 class="articles-all-title">
        Wedding Blog
      </h4>
      <p class="article-all-content-text">
        You don't marry the person you can live with, you marry the person you can't live without.
      </p>
    </div>
    <div class="articles-all-forms-wrapper">
      <Search
        :is-search-icon-clicked="isSearchIconClicked"
        :query="query"
        @on-search-form="onSearchForm"
        @on-search="onSearch"
      />
      <CategoryDropDown
        :selected-category-name="selectedCategory.name"
        @on-category-handler="onCategoryHandler"
        @on-remove-category-handler="onRemoveCategoryHandler"
      />
    </div>
    <List :articles="articles" />
    <Pagination
      :current-page="currentPage"
      :pages-count="pagesCount"
      :selected-category="selectedCategory"
      @on-click-handler="onPaginationHandler"
    />
  </section>
</template>

<style scoped>
.articles-all {
  margin: 0 auto;
  text-align: center;
}
.articles-all-title-wrapper {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.articles-all-title {
  font-size: 46px;
  font-weight: 400;
  letter-spacing: 2.5px;
  margin-bottom: 34px;
}

.article-all-content-text {
  font-size: 33px;
  font-weight: 300;
  line-height: 1.9;
  margin-bottom: 120px;
}

.articles-all-forms-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 34px;
  font-weight: 300;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 100px;
}

@media screen and (max-width: 1100px) {
  .articles-all-forms-wrapper {
    flex-direction: column;
    gap: 50px;
  }
}

@media screen and (max-width: 700px) {
  .articles-all-title-wrapper {
    padding-right: 30px;
    padding-left: 30px;
  }

  .articles-all-title {
    font-size: 40px;
  }

  .article-all-content-text {
    font-size: 29px;
  }
}
</style>
