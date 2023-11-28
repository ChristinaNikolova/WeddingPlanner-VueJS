<script>
import { useVuelidate } from '@vuelidate/core';
import subtasksService from '../../../services/subtasks';
import SubtaskForm from './Form.vue';

export default {
  components: { SubtaskForm },
  props: {
    taskId: {
      type: String,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
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
        description: '',
      },
      serverError: '',
    };
  },
  methods: {
    async onSubmitHandler(description) {
      await subtasksService
        .create(this.taskId, description)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.data.description = '';
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
  <SubtaskForm
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
