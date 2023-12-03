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
  },
  emits: ['onCancelFormHandler', 'onFinish'],
  data() {
    return {
      data: {
        title: '',
        price: '',
      },
      formName: formNames.UPDATE,
      isDisabled: false,
      serverError: [],
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
      await costsService
        .update(this.costId, title, price)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.serverError = [];
          this.$emit('onFinish', e);
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = !!disable;
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
  </CostForm>
</template>
