<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import { formNames } from '../../utils/constants/global';
import { note as noteModels } from '../../utils/constants/model';
import notesService from '../../services/notes';

export default {
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    noteId: {
      type: String,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
    loadNotes: {
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
      formName: formNames.UPDATE,
      serverError: '',
      isDisabled: true,
      models: noteModels,
      global,
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
  async created() {
    await notesService
      .getById(this.plannerId, this.noteId)
      .then((res) => {
        this.data.description = res.description;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await notesService
        .update(this.noteId, this.data.description)
        .then(async (res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = '';
          this.onCancelFormHandler();
          this.loadNotes();
        })
        .catch(err => console.error(err));
    },
  },
};
//  ref={formRef}
</script>

<template>
  <div class="form-wrapper-center">
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
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>
