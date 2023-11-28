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
    },
    onCancelFormHelperHandler: {
      type: Function,
      required: true,
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
      serverError: '',
    };
  },
  async created() {
    await subtasksService
      .getById(this.subtaskId)
      .then((res) => {
        this.data.description = res.description;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(description) {
      await subtasksService
        .update(this.subtaskId, description)
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
  <SubtaskForm
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    :initial-disabled="isDisabled"
    :on-cancel-form-handler="onCancelFormHelperHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
