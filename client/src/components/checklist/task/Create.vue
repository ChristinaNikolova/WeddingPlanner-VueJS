<script>
import { useVuelidate } from '@vuelidate/core';
import tasksService from '../../../services/tasks';
import TaskForm from './Form.vue';

export default {
  components: { TaskForm },
  props: {
    plannerId: {
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
        title: '',
        description: '',
      },
      serverError: '',
      timespan: '',
    };
  },
  methods: {
    async onSubmitHandler(e, title, description) {
      this.timespan = e.target.parentElement.previousSibling.children[0].textContent;
      await tasksService
        .create(this.plannerId, title, description, this.timespan)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.data.title = '';
          this.data.description = '';
          this.$nextTick(() => { this.v$.$reset(); });

          this.serverError = '';
          this.$emit('onFinish', e);
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <TaskForm
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
