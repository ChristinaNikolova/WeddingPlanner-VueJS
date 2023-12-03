<script>
import { useVuelidate } from '@vuelidate/core';
import costsService from '../../services/costs';
import { formNames } from '../../utils/constants/global';
import CostForm from './Form.vue';

export default {
  components: { CostForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: {
        title: '',
        price: '',
      },
      serverError: '',
      formName: formNames.CREATE,
      isDisabled: true,
    };
  },

  methods: {
    async onSubmitHandler(e, title, price) {
      await costsService
        .create(this.plannerId, title, price, this.category)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.data.title = '';
          this.data.price = '';
          this.$nextTick(() => { this.v$.$reset(); });

          this.serverError = '';
          this.$emit('onFinish', e);
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = disable;
    },
    cancelForm(e) {
      this.$emit('onCancelFormHandler', e);
    },
  },
};
</script>

<template>
  <CostForm
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
  </CostForm>
</template>
