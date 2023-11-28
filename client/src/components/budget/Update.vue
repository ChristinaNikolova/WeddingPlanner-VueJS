<script>
import { formNames } from '../../utils/constants/global';
import costsService from '../../services/costs';
import CostForm from './Form.vue';

export default {
  components: { CostForm },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    costId: {
      type: String,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  data() {
    return {
      data: {
        title: '',
        price: null,
      },
      formName: formNames.UPDATE,
      isDisabled: true,
      serverError: '',
    };
  },
  async created() {
    await costsService
      .getById(this.pannerId, this.costId)
      .then((res) => {
        this.data.title = res.title;
        this.data.price = res.price;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(e, title, price) {
      costsService
        .update(this.costId, title, price)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
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
    :form-name="formName"
    :initial-disabled="isDisabled"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
