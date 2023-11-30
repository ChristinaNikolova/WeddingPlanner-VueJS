<script>
import { useVuelidate } from '@vuelidate/core';
import notesService from '../../services/notes';
import NoteForm from './Form.vue';

export default {
  components: { NoteForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
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
      serverError: '',
      isDisabled: true,
    };
  },
  methods: {
    async onSubmitHandler(description) {
      await notesService
        .create(this.plannerId, description)
        .then(async (res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.data.description = '';
          this.$nextTick(() => { this.v$.$reset(); });

          this.serverError = '';
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = disable;
    },
    cancelForm() {
      this.$emit('onCancelFormHandler');
    },
  },
};
</script>

<template>
  <NoteForm
    v-if="!isHidden"
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
  </NoteForm>
</template>
