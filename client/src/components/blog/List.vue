<script>
import Single from './Single.vue';

export default {
  components: { Single },
  props: {
    articles: {
      type: [],
      default: () => ([]),
    },
    currentPage: {
      type: Number,
    },
    selectedCategory: {
      type: String,
    },
  },
};
</script>

<template>
  <template v-if="articles.length">
    <div class="articles-list-blog">
      <Single
        v-for="(a, i) in articles"
        :id="a.id"
        :key="a.id"
        :class-name="i % 2 === 0 ? 'left' : 'right'"
        :title="a.title"
        :image="a.image"
        :short-content="a.shortContent"
        :created-at="a.createdAt"
        :category-name="a.category.name"
        :current-page="currentPage"
        :selected-category="selectedCategory"
      />
    </div>
  </template>
  <p class="empty">
    No Articles Yet
  </p>
</template>

<style scoped>
.articles-list-blog {
  max-width: 1600px;
  margin: 0 auto;
}
</style>
