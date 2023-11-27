<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { addButtonTexts, formNames, roles } from '../../utils/constants/global';
import guestsService from '../../services/guests';
import { global } from '../../utils/constants/error';
import { guest as guestModel } from '../../utils/constants/model';

export default {
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
    loadGuests: {
      type: Function,
      required: true,
    },
  },
  emits: ['onShowFormHandler', 'onCancelFormHandler'],
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
        role: null,
        gender: 'male',
        side: 'bride',
        table: '',
        mainDish: 'no info',
        confirmed: 'no',
      },
      formName: formNames.CREATE,
      serverError: '',
      isDisabled: true,
      models: guestModel,
      addButtonTexts,
      global,
      roles,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.firstName.$invalid
          || this.v$.data.lastName.$invalid
          || this.v$.data.role.$invalid;
        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError;
      return this.isDisabled;
    },
  },
  validations() {
    return {
      data: {
        firstName: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), minLength(this.models.NAME_MIN_LEN)),
          maxLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), maxLength(this.models.NAME_MAX_LEN)),
        },
        lastName: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), minLength(this.models.NAME_MIN_LEN)),
          maxLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), maxLength(this.models.NAME_MAX_LEN)),
        },
        role: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
        table: {},
      },
    };
  },
  methods: {
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await guestsService
        .create(this.plannerId, this.data.firstName, this.data.lastName, this.data.gender, this.data.age, this.data.side, this.data.role, this.data.table, this.data.mainDish, this.data.confirmed)
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
          this.onCancelFormHandler();
          this.loadGuests();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<!-- todo and checkwhich tag ref={formRef} -->
<template>
  <AddButton
    :class-names="['guest-form-icon']"
    :text="addButtonTexts.GUEST"
    :is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <div class="form-wrapper-center">
    <form v-if="!isHidden" class="guest-form form-error-message-width" @submit.prevent="onSubmitHandler">
      <ServerError v-if="serverError" :errors="serverError" />
      <AppInput
        v-model.trim="v$.data.firstName.$model"
        :errors="v$?.data.firstName.$errors"
        name="firstName"
        type="text"
        label="First Name"
      />
      <AppInput
        v-model.trim="v$.data.lastName.$model"
        :errors="v$?.data.lastName.$errors"
        name="lastName"
        type="text"
        label="Last Name"
      />
      <div class="form-wrapper">
        <label class="label">Gender:</label>
        <div class="radio">
          <div div class="form-wrapper-input-radio">
            <label class="label" for="male">Male</label>
            <input
              id="male"
              v-model.trim="data.gender"
              type="radio"
              value="male"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="female">Female</label>
            <input
              id="female"
              v-model.trim="data.gender"
              type="radio"
              value="female"
              class="input"
            >
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <label class="label">Age:</label>
        <div class="radio">
          <div div class="form-wrapper-input-radio">
            <label class="label" for="adult">Adult</label>
            <input
              id="adult"
              v-model.trim="data.age"
              type="radio"
              value="adult"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="child">Child</label>
            <input
              id="child"
              v-model.trim="data.age"
              type="radio"
              value="child"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="baby">Baby</label>
            <input
              id="baby"
              v-model.trim="data.age"
              type="radio"
              value="baby"
              class="input"
            >
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <label class="label">Side:</label>
        <div class="radio">
          <div div class="form-wrapper-input-radio">
            <label class="label" for="bride">Bride</label>
            <input
              id="bride"
              v-model.trim="data.side"
              type="radio"
              value="bride"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="groom">Groom</label>
            <input
              id="groom"
              v-model.trim="data.side"
              type="radio"
              value="groom"
              class="input"
            >
          </div>
        </div>
      </div>
      <AppSelect
        v-model.trim="v$.data.role.$model"
        :errors="v$?.data.role.$errors"
        name="role"
        label="Role"
        :categories="roles"
      />
      <AppInput
        v-model.trim="v$.data.table.$model"
        :errors="v$?.data.table.$errors"
        name="table"
        type="text"
        label="Table"
      />
      <div class="form-wrapper">
        <label class="label">Main dish:</label>
        <div class="radio">
          <div div class="form-wrapper-input-radio">
            <label class="label" for="noInfo">No info</label>
            <input
              id="noInfo"
              v-model.trim="data.mainDish"
              type="radio"
              value="no info"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="meat">Meat</label>
            <input
              id="meat"
              v-model.trim="data.mainDish"
              type="radio"
              value="meat"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="fish">Fish</label>
            <input
              id="fish"
              v-model.trim="data.mainDish"
              type="radio"
              value="fish"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="veggies">Veggies</label>
            <input
              id="veggies"
              v-model.trim="data.mainDish"
              type="radio"
              value="veggies"
              class="input"
            >
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <label class="label">Confirmed:</label>
        <div class="radio">
          <div div class="form-wrapper-input-radio">
            <label class="label" for="yes">Yes</label>
            <input
              id="yes"
              v-model.trim="data.confirmed"
              type="radio"
              value="yes"
              class="input"
            >
          </div>
          <div div class="form-wrapper-input-radio">
            <label class="label" for="no">No</label>
            <input
              id="no"
              v-model.trim="data.confirmed"
              type="radio"
              value="no"
              class="input"
            >
          </div>
        </div>
      </div>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>

<style scoped>
.guest-form {
  width: 24%;
}

@media screen and (max-width: 1500px) {
  .guest-form {
    width: 50%;
  }
}

@media screen and (max-width: 900px) {
  .guest-form {
    width: 80%;
  }
}

@media screen and (max-width: 450px) {
  .guest-form {
    width: 90%;
  }
}
</style>
