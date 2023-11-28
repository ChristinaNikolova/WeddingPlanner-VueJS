<script>
import { useVuelidate } from '@vuelidate/core';
import costsService from '../../services/costs';
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
    onCancelFormHandler: {
      type: Function,
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
        price: null,
      },
      serverError: '',
    };
  },

  methods: {
    async onSubmitHandler(e, title, price) {
      costsService
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
  },
};
</script>

<template>
  <CostForm
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
