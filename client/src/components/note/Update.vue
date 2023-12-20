<script setup>
import { onMounted, ref } from 'vue';
import { formNames } from '../../utils/constants/global';
import notesService from '../../services/notes';
import NoteForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  noteId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const formName = formNames.UPDATE;
const data = ref({
  description: '',
});
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  notesService
    .getById(props.plannerId, props.noteId)
    .then((res) => {
      data.value.description = res.description;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(description) {
  notesService
    .update(props.noteId, description)
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
  <NoteForm
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
  </NoteForm>
</template>
