<script setup>
import { computed } from 'vue';

const props = defineProps({
  parentIndex: {
    type: Number,
    default: 0,
  },
  currentIndex: {
    type: Number,
    default: 0,
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
    <p class="comment-carousel-date">
      posted on {{ props.comment.createdAt }}
    </p>
    <p class="comment-carousel-content">
      {{ props.comment.content }}
    </p>
    <p class="comment-carousel-likes-wrapper">
      <span class="comment-carousel-likes">Likes:
        <span class="comment-carousel-likes-count">{{ props.comment.likesCount }}</span>
      </span>
      <i class="fa-solid fa-heart" />
      <!-- <i v-else class="fa-regular fa-heart" /> -->
    </p>
  </article>
</template>

<style scoped>
.comment-carousel-creator {
  font-size: 20px;
  margin-bottom: 10px;
  text-decoration: underline;
}
.comment-carousel-date {
  font-size: 18px;
  margin-bottom: 26px;
}

.comment-carousel-content {
  font-size: 30px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.comment-carousel-likes-wrapper {
  font-size: 20px;
}

.comment-carousel-likes-wrapper i {
  color: var(--clr-gold);
}
.comment-carousel-likes {
  margin-right: 20px;
}

.comment-carousel-likes-count {
  color: var(--clr-gold);
}
</style>
