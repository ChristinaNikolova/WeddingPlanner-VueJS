<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { formNames } from '../../utils/constants/global';
import commentsService from '../../services/comments';
import CommentForm from './Form.vue';

const props = defineProps({
  articleId: {
    type: String,
    required: true,
    default: '',
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  content: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(content) {
  commentsService
    .create(props.articleId, content)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      data.value.content = '';
      nextTick(() => {
        v$.value.$reset();
      });
      serverError.value = [];
      emit('onFinish');
    })
    .catch(err => console.error(err));
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};

function cancelForm() {
  emit('onCancelFormHandler');
};
</script>

<template>
  <CommentForm
    v-if="!props.isHidden"
    :initial-data="data"
    :server-error="serverError"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="cancelForm"
      />
    </template>
  </CommentForm>
</template>
