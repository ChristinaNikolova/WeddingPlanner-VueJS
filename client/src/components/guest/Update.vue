<script>
import guestsService from '../../services/guests';
import { formNames } from '../../utils/constants/global';
import GuestForm from './Form.vue';

export default {
  components: { GuestForm },
  props: {
    guestId: {
      type: String,
      required: true,
      default: '',
    },
    plannerId: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: ['onCancelFormHandler', 'onFinish'],
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
      formName: formNames.UPDATE,
      isDisabled: false,
    };
  },
  async created() {
    await guestsService
      .getById(this.plannerId, this.guestId)
      .then((res) => {
        this.data.firstName = res.firstName;
        this.data.lastName = res.lastName;
        this.data.age = res.age;
        this.data.role = res.role;
        this.data.gender = res.gender;
        this.data.side = res.side;
        this.data.table = res.table;
        this.data.mainDish = res.mainDish;
        this.data.confirmed = res.confirmed ? 'yes' : 'no';
      }).catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
      await guestsService
        .update(this.guestId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

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
    :initial-data="data"
    :initial-disabled="isDisabled"
    :server-error="serverError"
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
  </GuestForm>
</template>
