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
const emit = defineEmits(['onCancelFormHandler', 'finish']);
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
      nextTick(() => {
        v$.value.$reset();
      });
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
        @on-cancel-button-form-handler="onCancelForm"
      />
    </template>
  </EventForm>
</template>
