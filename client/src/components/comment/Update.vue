<script setup>
import { onMounted, ref } from 'vue';
import commentsService from '../../services/comments';
import { formNames } from '../../utils/constants/global';
import CommentForm from './Form.vue';

const props = defineProps({
  commentId: {
    type: String,
    required: true,
    default: '',
  },
  articleId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const formName = formNames.UPDATE;
const data = ref({
  content: '',
});
const isDisabled = ref(false);
const serverError = ref([]);

onMounted(() => {
  commentsService
    .getById(props.commentId, props.articleId)
    .then((res) => {
      data.value.content = res.content;
    });
});

function onSubmitHandler(content) {
  commentsService
    .update(props.commentId, content)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      emit('finish');
    })
    .catch(err => console.error(err));
};

function onCancelForm() {
  emit('onCancelFormHandler');
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
</script>

<template>
  <CommentForm
    :initial-data="data"
    :initial-server-error="serverError"
    :initial-disabled="isDisabled"
    @check-is-disabled="checkIsDisabled"
    @on-submit-handler="onSubmitHandler"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelForm"
      />
    </template>
  </CommentForm>
</template>
