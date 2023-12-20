<script setup>
import { onMounted, ref } from 'vue';
import { formNames } from '../../../utils/constants/global';
import subtasksService from '../../../services/subtasks';
import SubtaskForm from './Form.vue';

const props = defineProps({
  subtaskId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHelperHandler', 'finish']);
const formName = formNames.UPDATE;
const data = ref({
  description: '',
});
const isDisabled = ref(false);
const serverError = ref([]);

onMounted(() => {
  subtasksService
    .getById(props.subtaskId)
    .then((res) => {
      data.value.description = res.description;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(description) {
  subtasksService
    .update(props.subtaskId, description)
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

function onCancelForm(e) {
  emit('onCancelFormHelperHandler', e);
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
</script>

<template>
  <SubtaskForm
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
  </SubtaskForm>
</template>
