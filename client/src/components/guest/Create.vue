<script>
import { useVuelidate } from '@vuelidate/core';
import guestsService from '../../services/guests';
import { formNames } from '../../utils/constants/global';
import GuestForm from './Form.vue';

export default {
  components: { GuestForm },
  props: {
    plannerId: {
      type: String,
      required: true,
      default: '',
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
        firstName: '',
        lastName: '',
        age: 'adult',
        role: '',
        gender: 'male',
        side: 'bride',
        table: '',
        mainDish: 'no info',
        confirmed: 'no',
      },
      serverError: [],
      isDisabled: true,
      formName: formNames.CREATE,
    };
  },
  methods: {
    async onSubmitHandler(firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
      await guestsService
        .create(this.plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.data.firstName = '';
          this.data.lastName = '';
          this.data.gender = 'male';
          this.data.age = 'adult';
          this.data.side = 'bride';
          this.data.role = '';
          this.data.table = '';
          this.data.mainDish = 'no info';
          this.data.confirmed = 'no';
          this.$nextTick(() => { this.v$.$reset(); });

          this.serverError = [];
          this.$emit('onFinish');
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = !!disable;
    },
    cancelForm() {
      this.$emit('onCancelFormHandler');
    },
  },
};
</script>

<template>
  <GuestForm
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
  </GuestForm>
</template>
