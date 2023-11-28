<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import { note as noteModels } from '../../utils/constants/model';
import { formNames } from '../../utils/constants/global';

export default {
  props: {
    initialData: {
      description: '',
    },
    serverError: {
      type: String,
      default: '',
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
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: this.initialData,
      models: noteModels,
      global,
      isDisabled: this.initialDisabled,
    };
  },
  watch: {
    data: {
      handler() {
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
    this.$refs.formRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
  <div ref="formRef" class="form-wrapper-center">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="serverError" :errors="serverError" />
      <AppTextArea
        v-model.trim="v$.data.description.$model"
        :errors="v$?.data.description.$errors"
        name="description"
        rows="10"
        label="Note"
      />
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>
