<script>
import { useVuelidate } from '@vuelidate/core';
import tasksService from '../../../services/tasks';
import { formNames } from '../../../utils/constants/global';
import TaskForm from './Form.vue';

export default {
  components: { TaskForm },
  props: {
    plannerId: {
      type: String,
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
      isDisabled: true,
      formName: formNames.CREATE,
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
    checkIsDisabled(disable) {
      this.isDisabled = disable;
    },
    cancelForm(e) {
      this.$emit('onCancelFormHandler', e);
    },
  },
};
</script>

<template>
  <TaskForm
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
  </TaskForm>
</template>
