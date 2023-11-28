<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { formNames, styleNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { subtask as subtaskModel } from '../../../utils/constants/model';

export default {
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    serverError: {
      type: String,
    },
    formName: {
      type: String,
      default: formNames.CREATE,
    },
    initialDisabled: {
      type: Boolean,
      default: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onSubmitHandler', 'onCancelFormHandler'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: this.initialData,
      isDisabled: this.initialDisabled,
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
  mounted() {
    this.$refs.formRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  methods: {
    async onSubmitFormHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }
      this.$emit('onSubmitHandler', this.data.description);
    },
  },
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler">
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
