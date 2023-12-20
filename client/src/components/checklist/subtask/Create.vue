<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import subtasksService from '../../../services/subtasks';
import { formNames } from '../../../utils/constants/global';
import SubtaskForm from './Form.vue';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  description: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(description) {
  subtasksService
    .create(props.taskId, description)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      data.value.description = '';
      nextTick(() => {
        v$.value.$reset();
      });
      serverError.value = [];
      emit('finish');
    })
    .catch(err => console.error(err));
};

function onCancelForm(e) {
  emit('onCancelFormHandler', e);
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
</script>

<template>
  <SubtaskForm
    :initial-data="data"
    :server-error="serverError"
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
  </SubtaskForm>
</template>
