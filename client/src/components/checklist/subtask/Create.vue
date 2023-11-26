<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { formNames, styleNames } from '../../../utils/constants/global';

import { global } from '../../../utils/constants/error';
import { subtask as subtaskModel } from '../../../utils/constants/model';
import subtasksService from '../../../services/subtasks';

export default {
  props: {
    taskId: {
      type: String,
      required: true,
    },
    loadTasks: {
      type: Function,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: {
        description: '',
      },
      formName: formNames.CREATE,
      serverError: '',
      isDisabled: true,
      currentStyle: styleNames.NONE,
      models: subtaskModel,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        this.currentStyle = styleNames.FLEX;
        this.isDisabled = this.v$.data.description.$invalid;
        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError;
      return this.isDisabled;
    },
  },
  validations() {
    return {
      data: {
        description: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.DESC(this.models.DESC_MIN_LEN, this.models.DESC_MAX_LEN), minLength(this.models.DESC_MIN_LEN)),
          maxLength: helpers.withMessage(global.DESC(this.models.DESC_MIN_LEN, this.models.DESC_MAX_LEN), maxLength(this.models.DESC_MAX_LEN)),
        },
      },
    };
  },
  methods: {
    async onSubmitHandler(e) {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await subtasksService
        .create(this.taskId, this.data.description)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          // todo check if functions needed!!!
          // todo extract form in separate component
          // todo fix no content @media
          // todo emits or function

          this.serverError = '';
          this.currentStyle = styleNames.NONE;
          this.onCancelFormHandler(e);
          this.loadTasks();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <div class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitHandler">
      <ServerError v-if="serverError" :errors="serverError" />
      <AppTextArea
        v-model.trim="v$.data.description.$model"
        :errors="v$?.data.description.$errors"
        name="description"
        rows="4"
        label="Description"
      />
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>
