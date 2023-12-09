<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import eventsService from '../../services/events';
import { formNames } from '../../utils/constants/global';
import EventForm from './Form.vue';

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
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  title: '',
  startTime: '',
  endTime: '',
  duration: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(title, startTime, endTime, duration) {
  eventsService
    .create(props.plannerId, title, startTime, endTime, duration)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }

      data.value.title = '';
      data.value.startTime = '';
      data.value.endTime = '';
      data.value.duration = '';
      nextTick(() => { v$.value.$reset(); });

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
  <EventForm
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
  </EventForm>
</template>
