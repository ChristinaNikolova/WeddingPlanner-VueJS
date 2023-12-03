<script>
import { formNames } from '../../utils/constants/global';
import notesService from '../../services/notes';
import NoteForm from './Form.vue';

export default {
  components: { NoteForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    noteId: {
      type: String,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  data() {
    return {
      data: {
        description: '',
      },
      serverError: '',
      formName: formNames.UPDATE,
      isDisabled: false,
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
    async onSubmitHandler(description) {
      await notesService
        .update(this.noteId, description)
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
  </NoteForm>
</template>
