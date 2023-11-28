<script>
import eventsService from '../../services/events';
import { formNames } from '../../utils/constants/global';
import EventForm from './Form.vue';

export default {
  components: { EventForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  data() {
    return {
      data: {
        title: '',
        startTime: '',
        endTime: '',
        duration: '',
      },
      formName: formNames.UPDATE,
      isDisabled: false,
      serverError: '',
    };
  },
  async created() {
    await eventsService
      .getById(this.plannerId, this.eventId)
      .then((res) => {
        this.data.title = res.title;
        this.data.startTime = res.startTime;
        this.data.endTime = res.endTime;
        this.data.duration = res.duration;
      });
  },
  methods: {
    async onSubmitHandler(title, startTime, endTime, duration) {
      await eventsService
        .update(this.eventId, title, startTime, endTime, duration)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = '';
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <EventForm
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    :initial-disabled="isDisabled"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
