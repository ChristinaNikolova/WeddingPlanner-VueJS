<script setup>
import Single from './Single.vue';

const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <template v-if="props.articles.length">
    <div class="articles-list-blog">
      <Single
        v-for="(a, i) in props.articles"
        :id="a.id"
        :key="a.id"
        :class-name="i % 2 === 0 ? 'left' : 'right'"
        :title="a.title"
        :image="a.image"
        :short-content="a.shortContent"
        :created-at="a.createdAt"
        :category-name="a.category.name ? a.category.name : ''"
      />
    </div>
  </template>
  <p v-else class="empty">
    No Articles Yet
  </p>
</template>

<style scoped>
.articles-list-blog {
  max-width: 1600px;
  margin: 0 auto;
}
</style>
