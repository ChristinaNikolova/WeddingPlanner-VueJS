<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { roles } from '../../utils/constants/global';
import { global } from '../../utils/constants/error';
import { guest as guestModel } from '../../utils/constants/model';

export default {
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    serverError: {
      type: String,
    },
    initialDisabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onSubmitHandler', 'checkIsDisabled'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: this.initialData,
      isDisabled: this.initialDisabled,
      models: guestModel,
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
        this.$emit('checkIsDisabled', this.isDisabled);
        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError;
      this.$emit('checkIsDisabled', this.isDisabled);
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
  mounted() {
    this.$refs.formRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },
  methods: {
    async onSubmitFormHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      this.$emit('onSubmitHandler', this.data.firstName, this.data.lastName, this.data.gender, this.data.age, this.data.side, this.data.role, this.data.table, this.data.mainDish, this.data.confirmed);
    },
  },
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="guest-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
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
          <div class="form-wrapper-input-radio">
            <label class="label" for="male">Male</label>
            <input
              id="male"
              v-model.trim="data.gender"
              type="radio"
              value="male"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
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
          <div class="form-wrapper-input-radio">
            <label class="label" for="adult">Adult</label>
            <input
              id="adult"
              v-model.trim="data.age"
              type="radio"
              value="adult"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
            <label class="label" for="child">Child</label>
            <input
              id="child"
              v-model.trim="data.age"
              type="radio"
              value="child"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
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
          <div class="form-wrapper-input-radio">
            <label class="label" for="bride">Bride</label>
            <input
              id="bride"
              v-model.trim="data.side"
              type="radio"
              value="bride"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
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
          <div class="form-wrapper-input-radio">
            <label class="label" for="noInfo">No info</label>
            <input
              id="noInfo"
              v-model.trim="data.mainDish"
              type="radio"
              value="no info"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
            <label class="label" for="meat">Meat</label>
            <input
              id="meat"
              v-model.trim="data.mainDish"
              type="radio"
              value="meat"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
            <label class="label" for="fish">Fish</label>
            <input
              id="fish"
              v-model.trim="data.mainDish"
              type="radio"
              value="fish"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
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
          <div class="form-wrapper-input-radio">
            <label class="label" for="yes">Yes</label>
            <input
              id="yes"
              v-model.trim="data.confirmed"
              type="radio"
              value="yes"
              class="input"
            >
          </div>
          <div class="form-wrapper-input-radio">
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
      <slot name="button" />
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
