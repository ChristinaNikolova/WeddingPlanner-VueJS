<script>
import { useVuelidate } from '@vuelidate/core';
import eventsService from '../../services/events';
import { formNames } from '../../utils/constants/global';
import EventForm from './Form.vue';

export default {
  components: { EventForm },
  props: {
    plannerId: {
      type: String,
      required: true,
      default: '',
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
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
      serverError: [],
      isDisabled: true,
      formName: formNames.CREATE,
    };
  },
  methods: {
    onSubmitHandler(title, startTime, endTime, duration) {
      eventsService
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

          this.serverError = [];
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = !!disable;
    },
    cancelForm() {
      this.$emit('onCancelFormHandler');
    },
  },
};
</script>

<template>
  <EventForm
    v-if="!isHidden"
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
