<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import tasksService from '../../../services/tasks';
import { formNames } from '../../../utils/constants/global';
import TaskForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  title: '',
  description: '',
});
const serverError = ref([]);
const timespan = ref('');
const isDisabled = ref(true);

function onSubmitHandler(e, title, description) {
  timespan.value = e.target.parentElement.previousSibling.children[0].textContent;
  tasksService
    .create(props.plannerId, title, description, timespan.value)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      data.value.title = '';
      data.value.description = '';
      nextTick(() => {
        v$.value.$reset();
      });
      serverError.value = [];
      emit('finish', e);
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
  <TaskForm
    :initial-data="data"
    :server-error="serverError"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelForm"
      />
    </template>
  </TaskForm>
</template>
