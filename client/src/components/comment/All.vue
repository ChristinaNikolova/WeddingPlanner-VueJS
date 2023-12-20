<script setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { addButtonTexts } from '../../utils/constants/global';
import Create from '../comment/Create.vue';
import Update from '../comment/Update.vue';
import commentsService from '../../services/comments';
import ListComments from './List.vue';

// todo function starts with on

const props = defineProps({
  initialArticleId: {
    type: String,
    required: true,
    default: '',
  },
});
const articleId = ref(props.initialArticleId);
const comments = ref([]);
const commentId = ref('');
const indexComment = ref(null);
const isHidden = ref(true);

onMounted(() => {
  loadComments();
});

onUpdated(() => {
  articleId.value = props.initialArticleId;
});

const isDisabled = computed(() => {
  return comments.value.length === 1;
});

watch(articleId, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadComments();
  }
});

function onShowFormHandler(e, id, i) {
  isHidden.value = !isHidden.value;
  commentId.value = id || '';
  indexComment.value = i || null;
};

function onCancelFormHandler() {
  isHidden.value = true;
  commentId.value = '';
};

function finish() {
  onCancelFormHandler();
  loadComments();
};

function clearIndex() {
  indexComment.value = null;
}

function loadComments() {
  commentsService
    .all(articleId.value)
    .then(res => comments.value = res)
    .catch(err => console.error(err));
}
</script>

<template>
  <div class="comments-wrapper">
    <h3 class="comments-title">
      Comments
    </h3>
    <Update
      v-if="commentId"
      :comment-id="commentId"
      :article-id="articleId"
      @on-cancel-form-handler="onCancelFormHandler"
      @finish="finish"
    />
    <template v-else>
      <AddButton
        :class-names="['comment-form-icon']"
        :text="addButtonTexts.COMMENT"
        :is-empty-string="true"
        @on-show-form-handler="onShowFormHandler"
      />
      <Create
        :article-id="articleId"
        :is-hidden="isHidden"
        @on-cancel-form-handler="onCancelFormHandler"
        @finish="finish"
      />
    </template>
    <template v-if="isHidden">
      <ListComments
        v-if="comments.length"
        :initial-comments="comments"
        :initial-index="indexComment"
        :is-disabled="isDisabled"
        @on-show-form-handler="onShowFormHandler"
        @load-comments="loadComments"
        @clear-index="clearIndex"
      />
      <p v-else class="empty">
        No comments yet
      </p>
    </template>
  </div>
</template>

<style scoped>
.comments-wrapper {
  padding: 20px 120px;
  background-color: var(--clr-light-creme);
}

.comments-wrapper .empty{
  text-align: center;
  font-size: 28px;
}

.comments-title {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
}

@media screen and (max-width: 1000px) {
  .comments-wrapper .empty {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 1000px) {
  .comments-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 60px;
    padding-right: 60px;
  }
}

@media screen and (max-width: 800px) {
  .comments-wrapper {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media screen and (max-width: 600px) {
  .comments-wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media screen and (max-width: 500px) {
  .comments-wrapper {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
