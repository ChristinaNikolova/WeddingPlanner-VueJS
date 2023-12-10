<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import notesService from '../../services/notes';
import { formNames } from '../../utils/constants/global';
import NoteForm from './Form.vue';

const props = defineProps({
  plannerId: {
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
const formName = formNames.CREATE;
const v$ = useVuelidate();
const data = ref({
  description: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(description) {
  notesService
    .create(props.plannerId, description)
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
  <NoteForm
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
  </NoteForm>
</template>
