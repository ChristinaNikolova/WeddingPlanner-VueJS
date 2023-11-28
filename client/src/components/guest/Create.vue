<script>
import { useVuelidate } from '@vuelidate/core';
import { addButtonTexts } from '../../utils/constants/global';
import guestsService from '../../services/guests';
import GuestForm from './Form.vue';

export default {
  components: { GuestForm },
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
  emits: ['onShowFormHandler', 'onCancelFormHandler', 'onFinish'],
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
      serverError: '',
      addButtonTexts,
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
          this.data.role = null;
          this.data.table = '';
          this.data.mainDish = 'no info';
          this.data.confirmed = 'no';
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
    :class-names="['guest-form-icon']"
    :text="addButtonTexts.GUEST"
    :is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <GuestForm
    v-if="!isHidden"
    :initial-data="data"
    :server-error="serverError"
    :on-cancel-form-handler="onCancelFormHandler"
    @on-submit-handler="onSubmitHandler"
  />
</template>
