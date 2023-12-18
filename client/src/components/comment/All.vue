<script setup>
import { onMounted, ref } from 'vue';
import { addButtonTexts } from '../../utils/constants/global';
import Create from '../comment/Create.vue';
import commentsService from '../../services/comments';
import ListComments from './List.vue';

// todo check if everything is needed
// todo mobile version
// todo fix show comments, when new article selected
// add like unlike logic
// update, delete, when creator

const props = defineProps({
  articleId: {
    type: String,
    required: true,
    default: '',
  },
});
const comments = ref([]);
const isHidden = ref(true);

onMounted(() => {
  loadComments();
});

function onShowFormHandler(e, id) {
  isHidden.value = !isHidden.value;
  // eventId.value = id || '';
  // isEditIconHidden.value = !isEditIconHidden.value;
};

function onCancelFormHandler() {
  isHidden.value = true;
  // eventId.value = '';
  // isEditIconHidden.value = false;
};

function onFinish() {
  onCancelFormHandler();
  loadComments();
};

function loadComments() {
  commentsService
    .all(props.articleId)
    .then(res => comments.value = res)
    .catch(err => console.error(err));
}
</script>

<template>
  <div class="comments-wrapper">
    <h3 class="comments-title">
      Comments
    </h3>
    <AddButton
      :class-names="['comment-form-icon']"
      :text="addButtonTexts.COMMENT"
      :is-empty-string="true"
      @on-show-form-handler="onShowFormHandler"
    />
    <Create
      :article-id="props.articleId"
      :is-hidden="isHidden"
      @on-cancel-form-handler="onCancelFormHandler"
      @on-finish="onFinish"
    />
    <ListComments v-if="comments.length" :comments="comments" />
    <p v-else class="empty">
      No comments yet
    </p>
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
