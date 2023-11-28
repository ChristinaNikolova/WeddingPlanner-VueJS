<script>
import { useVuelidate } from '@vuelidate/core';
import eventsService from '../../services/events';
import { addButtonTexts } from '../../utils/constants/global';
import EventForm from './Form.vue';

export default {
  components: { EventForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
    onShowFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onShowFormHandler', 'onCancelFormHandler', 'onFinish'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: {
        title: '',
        startTime: '',
        endTime: '',
        duration: '',
      },
      addButtonTexts,
      serverError: '',
    };
  },

  methods: {
    async onSubmitHandler(title, startTime, endTime, duration) {
      await eventsService
        .create(this.plannerId, title, startTime, endTime, duration)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.data.title = '';
          this.data.startTime = '';
          this.data.endTime = '';
          this.data.duration = '';
          this.$nextTick(() => { this.v$.$reset(); });

          this.serverError = '';
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <AddButton
    :class-names="['event-form-icon']"
    :text="addButtonTexts.EVENT"
    :is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <EventForm
    v-if="!isHidden"
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
