<script>
import { useVuelidate } from '@vuelidate/core';
import { addButtonTexts } from '../../utils/constants/global';
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
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
    onShowFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onShowFormHandler', 'onFinish'],
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
      addButtonTexts,
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
  },
};
</script>

<template>
  <AddButton
    :class-names="['note-form-icon']"
    :text="addButtonTexts.NOTE"
    :is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <NoteForm
    v-if="!isHidden"
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
