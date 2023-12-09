<script setup>
import { onMounted, ref } from 'vue';
import eventsService from '../../services/events';
import { formNames } from '../../utils/constants/global';
import EventForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  eventId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
const data = ref({
  title: '',
  startTime: '',
  endTime: '',
  duration: '',
});
const formName = ref(formNames.UPDATE);
const isDisabled = ref(false);
const serverError = ref([]);

onMounted(() => {
  eventsService
    .getById(props.plannerId, props.eventId)
    .then((res) => {
      data.value.title = res.title;
      data.value.startTime = res.startTime;
      data.value.endTime = res.endTime;
      data.value.duration = res.duration;
    });
});

function onSubmitHandler(title, startTime, endTime, duration) {
  eventsService
    .update(props.eventId, title, startTime, endTime, duration)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }

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
    :initial-data="data"
    :server-error="serverError"
    :initial-disabled="isDisabled"
    @check-is-disabled="checkIsDisabled"
    @on-submit-handler="onSubmitHandler"
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
