<script>
import { useVuelidate } from '@vuelidate/core';
import subtasksService from '../../../services/subtasks';
import { formNames } from '../../../utils/constants/global';
import SubtaskForm from './Form.vue';

export default {
  components: { SubtaskForm },
  props: {
    taskId: {
      type: String,
      required: true,
      default: '',
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
      serverError: [],
      isDisabled: true,
      formName: formNames.CREATE,
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

          this.serverError = [];
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = !!disable;
    },
    cancelForm(e) {
      this.$emit('onCancelFormHandler', e);
    },
  },
};
</script>

<template>
  <SubtaskForm
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
  </SubtaskForm>
</template>
