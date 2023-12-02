<script>
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
    taskId: {
      type: String,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  data() {
    return {
      data: {
        title: '',
        description: '',
      },
      formName: formNames.UPDATE,
      isDisabled: false,
      serverError: '',
    };
  },
  async created() {
    await tasksService
      .getById(this.planner, this.taskId)
      .then((res) => {
        this.data.title = res.title;
        this.data.description = res.description;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(e, title, description) {
      tasksService
        .update(this.taskId, title, description)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
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
  </TaskForm>
</template>
