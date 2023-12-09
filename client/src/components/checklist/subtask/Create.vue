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
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
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
      nextTick(() => { v$.value.$reset(); });

      serverError.value = [];
      emit('onFinish');
    })
    .catch(err => console.error(err));
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};

function cancelForm(e) {
  emit('onCancelFormHandler', e);
};
</script>

<template>
  <SubtaskForm
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
  </SubtaskForm>
</template>
