<script setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { addButtonTexts } from '../../utils/constants/global';
import Create from '../comment/Create.vue';
import Update from '../comment/Update.vue';
import commentsService from '../../services/comments';
import ListComments from './List.vue';

// todo mobile version
// todo check if everything is needed
// todo function starts with on
// todo update Read me

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

function onFinish() {
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
      @on-finish="onFinish"
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
        @on-finish="onFinish"
      />
    </template>
    <template v-if="isHidden">
      <ListComments
        v-if="comments.length"
        :initial-comments="comments"
        :initial-index="indexComment"
        :is-disabled="isDisabled"
        @on-load-comments="loadComments"
        @on-show-form-handler="onShowFormHandler"
        @on-clear-index="clearIndex"
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
</style>
