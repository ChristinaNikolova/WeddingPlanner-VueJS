<script setup>
import { onMounted, ref } from 'vue';
import tasksService from '../../../services/tasks';
import { formNames } from '../../../utils/constants/global';
import TaskForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  taskId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  description: '',
});
const isDisabled = ref(false);
const serverError = ref([]);

onMounted(() => {
  tasksService
    .getById(props.plannerId, props.taskId)
    .then((res) => {
      data.value.title = res.title;
      data.value.description = res.description;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(e, title, description) {
  tasksService
    .update(props.taskId, title, description)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
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
    :initial-disabled="isDisabled"
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
