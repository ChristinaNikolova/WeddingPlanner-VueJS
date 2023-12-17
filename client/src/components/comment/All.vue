<script setup>
import { onMounted, ref } from 'vue';
import { addButtonTexts } from '../../utils/constants/global';
import Create from '../comment/Create.vue';
import commentsService from '../../services/comments';

const props = defineProps({
  articleId: {
    type: String,
    required: true,
    default: '',
  },
});

onMounted(() => {
  loadComments();
});
const isHidden = ref(true);
// todo mobile version

function onShowFormHandler(e, id) {
  isHidden.value = !isHidden.value;
  // eventId.value = id || '';
  // isEditIconHidden.value = !isEditIconHidden.value;
};

function onCancelFormHandler() {
  isHidden.value = true;
  //   eventId.value = '';
  // isEditIconHidden.value = false;
};

function onFinish() {
  onCancelFormHandler();
};

function loadComments() {
  commentsService
    .all(props.articleId)
    .then(res => console.log(res))
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
  </div>
</template>

<style scoped>
.comments-wrapper {
  padding:20px;
  background-color: var(--clr-light-creme);
}

.comments-title {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
}
</style>
