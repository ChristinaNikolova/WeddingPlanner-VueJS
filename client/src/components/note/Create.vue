<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import { addButtonTexts, formNames } from '../../utils/constants/global';
import { note as noteModels } from '../../utils/constants/model';
import notesService from '../../services/notes';

// todo formRef
export default {
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    isHidden: { type: Boolean, default: false },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
    onShowFormHandler: {
      type: Function,
      required: true,
    },
    loadNotes: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onShowFormHandler'],
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
      buttonText: addButtonTexts.NOTE,
      serverError: '',
      models: noteModels,
      global,
      isDisabled: false,
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
  methods: {
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await notesService
        .create(this.plannerId, this.data.description)
        .then(async (res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          // todo fix this
          this.data.description = '';
          this.serverError = '';
          this.onCancelFormHandler();
          this.loadNotes();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<!-- ref={formRef} -->
<template>
  <AddButton
    :class-names="['note-form-icon']"
    :text="buttonText"
    is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <div v-if="!isHidden" class="form-wrapper-center">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitHandler">
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
        @on-cancel-form-handler="$emit('onCancelFormHandler')"
      />
    </form>
  </div>
</template>
