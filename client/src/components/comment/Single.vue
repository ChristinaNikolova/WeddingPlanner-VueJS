<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import likes from '../../utils/helpers/likes';
import commentsService from '../../services/comments';

const props = defineProps({
  parentIndex: {
    type: Number,
    default: 0,
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  initialComment: {
    type: Object,
    default: () => {},
  },
});
const store = useAuthStore();
const isLiked = ref(getLikes(props.initialComment.likes));
const likesCount = ref(props.initialComment.likesCount);
const comment = ref(props.initialComment);
const isAuthor = ref(props.initialComment.creatorId === store.user.userId);
const isHovering = ref(false);

const isVisible = computed(() => {
  return props.currentIndex === props.parentIndex;
});

function onMouseEnter() {
  isHovering.value = true;
};

function onMouseLeave() {
  isHovering.value = false;
};

function like() {
  commentsService
    .like(comment.value.id)
    .then((res) => {
      isLiked.value = getLikes(res.likes);
      likesCount.value = res.likes.length;
    })
    .catch(err => console.error(err));
};

function getLikes(result) {
  return likes.setIsLikedHelper(result, store.user.userId);
}

function onDeleteHandler() {
  commentsService
    .deleteById(comment.value.id)
    .then(() => console.log('success'))
    .catch(err => console.error(err));
};
</script>

<template>
  <article v-show="isVisible" class="comment-carousel">
    <h5 class="comment-carousel-creator" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      {{ comment.creatorName }}
      <span v-if="isAuthor && isHovering" class="comment-carousel-icons">
        <i class="fa-solid fa-pen" />
        <i class="fa-solid fa-trash" @click="onDeleteHandler" />
      </span>
    </h5>
    <p class="comment-carousel-date">
      posted on {{ comment.createdAt }}
    </p>
    <p class="comment-carousel-content">
      {{ comment.content }}
    </p>
    <p class="comment-carousel-likes-wrapper">
      <span class="comment-carousel-likes">Likes:
        <span class="comment-carousel-likes-count">{{ likesCount }}</span>
      </span>
      <span v-if="!isAuthor" class="comment-carousel-likes-icons">
        <i v-if="isLiked" class="fa-solid fa-heart" @click="like" />
        <i v-else class="fa-regular fa-heart" @click="like" />
      </span>
    </p>
  </article>
</template>

<style scoped>
.comment-carousel-creator {
  font-size: 20px;
  margin-bottom: 10px;
  text-decoration: underline;
}

.comment-carousel-icons {
  margin-left: 20px;
  font-size: 16px;
}

.comment-carousel-icons i {
  margin-right: 10px;
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
