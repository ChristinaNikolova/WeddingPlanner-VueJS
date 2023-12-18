<script setup>
import { computed } from 'vue';

const props = defineProps({
  parentIndex: {
    type: Number,
  },
  currentIndex: {
    type: Number,
  },
  comment: {
    type: Object,
    default: () => {},
  },
});

const isVisible = computed(() => {
  return props.currentIndex === props.parentIndex;
});
</script>

<template>
  <article v-show="isVisible" class="comment-carousel">
    <h5 class="comment-carousel-creator">
      {{ props.comment.creatorName }}
    </h5>
    <ul>
      <li class="comment-carousel-content">
        {{ props.comment.content }}
      </li>
      <li class="comment-carousel-likes-wrapper">
        <span class="comment-carousel-likes">Likes:</span>
        {{ props.comment.likeCounts }}
        <i class="fa-solid fa-heart" />
        <!-- <i v-else class="fa-regular fa-heart" /> -->
      </li>
      <li>
        {{ props.comment.createdAt }}
      </li>
    </ul>
  </article>
</template>

<style scoped>
.comment-carousel-creator {
  font-size: 20px;
  margin-bottom: 30px;
  text-decoration: underline;
}

.comment-carousel-content {
  font-size: 30px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.comment-carousel-likes-wrapper {
  text-align: right;
}
</style>
