<script>
import { formNames } from '../../../utils/constants/global';
import subtasksService from '../../../services/subtasks';
import SubtaskForm from './Form.vue';

export default {
  components: { SubtaskForm },
  props: {
    subtaskId: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: ['onCancelFormHelperHandler', 'onFinish'],
  data() {
    return {
      data: {
        description: '',
      },
      formName: formNames.UPDATE,
      isDisabled: false,
      serverError: [],
    };
  },
  created() {
    subtasksService
      .getById(this.subtaskId)
      .then((res) => {
        this.data.description = res.description;
      })
      .catch(err => console.error(err));
  },
  methods: {
    onSubmitHandler(description) {
      subtasksService
        .update(this.subtaskId, description)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = [];
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = !!disable;
    },
    cancelForm(e) {
      this.$emit('onCancelFormHelperHandler', e);
    },
  },
};
</script>

<template>
  <SubtaskForm
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
  </SubtaskForm>
</template>
