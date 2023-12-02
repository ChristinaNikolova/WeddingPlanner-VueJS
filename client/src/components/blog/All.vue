<script>
import { jumbo } from '../../utils/constants/image';
import { directions } from '../../utils/constants/global';
import articlesService from '../../services/articles';
import Pagination from '../shared/Pagination.vue';
import form from '../../utils/helpers/form';
import CategoryDropDown from './CategoryDropDown.vue';
import List from './List.vue';
import Search from './Search.vue';

export default {
  components: { CategoryDropDown, List, Pagination, Search },
  data() {
    return {
      directions,
      pathToImage: jumbo.BLOG,
      articles: [],
      currentPage: this.$route?.query?.page ? Number(this.$route.query.page) : 1,
      selectedCategory: {
        id: this.$route?.query?.categoryId ? this.$route.query.categoryId : 'default',
        name: this.$route?.query?.category ? this.$route.query.category : 'all',
      },
      pagesCount: 1,
      isSearchIconClicked: false,
      query: '',
      isSearched: false,
    };
  },
  watch: {
    async selectedCategory(newValue, oldValue) {
      if (newValue.id !== oldValue.id) {
        this.currentPage = 1;
        await this.loadArticles();
        this.getNewQuery();
      }
    },
    async currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        await this.loadArticles();
        this.getNewQuery();
      }
    },
    async query() {
      this.currentPage = 1;
      await this.loadArticles();
      this.getNewQuery();
    },
  },
  async created() {
    await this.loadArticles();
    form.scrollToTop();
  },
  methods: {
    onPaginationHandler(direction) {
      const value = direction === this.directions.PREV ? -1 : 1;
      this.currentPage = this.currentPage + value;
      form.scrollToTop();
    },
    onSearchForm() {
      this.isSearchIconClicked = !this.isSearchIconClicked;
      this.isSearched = false;
      this.query = '';
    },
    onSearch(e, searchedQuery) {
      this.isSearched = true;
      this.query = searchedQuery;
    },
    onCategoryHandler(e) {
      this.selectedCategory = {
        id: e.target.id,
        name: e.target.textContent,
      };
    },
    onRemoveCategoryHandler() {
      this.selectedCategory = {
        id: 'default',
        name: 'all',
      };
    },
    getNewQuery() {
      this.$router.push(`/blog?page=${this.currentPage}&category=${this.selectedCategory.name}&categoryId=${this.selectedCategory.id}`);
    },
    async loadArticles() {
      await articlesService
        .all(this.currentPage, this.selectedCategory.id, this.query)
        .then((data) => {
          this.articles = data.articles;
          this.currentPage = Number(data.currentPage);
          this.pagesCount = data.pagesCount;
          this.isSearched = false;
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <section class="articles-all">
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
