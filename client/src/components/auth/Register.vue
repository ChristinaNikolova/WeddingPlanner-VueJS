<script>
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { mapActions } from 'pinia';
import authService from '../../services/auth';
import { auth as authErrors, global } from '../../utils/constants/error';
import { auth as authModels } from '../../utils/constants/model';
import { useAuthStore } from '../../store/auth';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repass: '',
      },
      isDisabled: true,
      serverError: [],
      errors: authErrors,
      models: authModels,
      globalErrors: global,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.firstName.$invalid
          || this.v$.data.lastName.$invalid
          || this.v$.data.email.$invalid
          || this.v$.data.password.$invalid
          || this.v$.data.repass.$invalid;

        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError.length;
      return this.isDisabled;
    },
  },
  validations() {
    return {
      data: {
        firstName: {
          required: helpers.withMessage(this.globalErrors.REQUIRED, required),
          minLength: helpers.withMessage(this.globalErrors.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), minLength(this.models.NAME_MIN_LEN)),
          maxLength: helpers.withMessage(this.globalErrors.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), maxLength(this.models.NAME_MAX_LEN)),
        },
        lastName: {
          required: helpers.withMessage(this.globalErrors.REQUIRED, required),
          minLength: helpers.withMessage(this.globalErrors.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), minLength(this.models.NAME_MIN_LEN)),
          maxLength: helpers.withMessage(this.globalErrors.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), maxLength(this.models.NAME_MAX_LEN)),
        },
        email: {
          required: helpers.withMessage(this.globalErrors.REQUIRED, required),
          email: helpers.withMessage(this.errors.EMAIL, email),
        },
        password: {
          required: helpers.withMessage(this.globalErrors.REQUIRED, required),
          minLength: helpers.withMessage(this.errors.PASSWORD(this.models.PASSWORD_MIN_LEN, this.models.PASSWORD_MAX_LEN), minLength(this.models.PASSWORD_MIN_LEN)),
          maxLength: helpers.withMessage(this.errors.PASSWORD(this.models.PASSWORD_MIN_LEN, this.models.PASSWORD_MAX_LEN), maxLength(this.models.PASSWORD_MAX_LEN)),
        },
        repass: {
          sameAs: helpers.withMessage(this.errors.REPEAT_PASSWORD, sameAs(this.data.password)),
        },
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ['userLogin']),
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      await authService.register(this.data.firstName, this.data.lastName, this.data.email, this.data.password)
        .then((data) => {
          if (!data.accessToken) {
            this.serverError = data.message;
            return;
          }
          this.userLogin(data);
          this.$router.push({ path: '/' });
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <section id="register" class="section-background">
    <ServerError v-if="serverError.length" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Register
      </h2>
      <p class="register-content">
        Please complete the register form to start planning you wedding day.
        You already have an account? Go to  <router-link class="navigation-link" to="/login">
          Login
        </router-link>
      </p>
    </div>
    <div class="register-content-wrapper">
      <img
        class="register-img img-shadow"
        src="../../../public/img/wedding-634526_1280.jpg"
        alt="bride_accessories"
      >
      <form class="auth-form" @submit.prevent="onSubmitHandler">
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
        <AppInput
          v-model.trim="v$.data.email.$model"
          :errors="v$?.data.email.$errors"
          name="email"
          type="email"
          label="Email"
        />
        <AppInput
          v-model.trim="v$.data.password.$model"
          :errors="v$?.data.password.$errors"
          name="password"
          type="password"
          label="Password"
        />
        <AppInput
          v-model.trim="v$.data.repass.$model"
          :errors="v$?.data.repass.$errors"
          name="repass"
          type="password"
          label="Repeat Password"
        />
        <button :disabled="isDisabled" class="btn">
          Register
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.register-content {
  font-size: 22px;
}

.register-content-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 80px;
  margin-bottom: 40px;
}

.register-img {
  max-width: 30%;
  max-height: 50%;
}

@media screen and (max-width: 950px) {
  .register-content-wrapper {
    flex-direction: column-reverse;
    gap: 60px;
    justify-content: center;
    align-items: center;
  }

  .register-img {
    max-width: 50%;
    max-height: 70%;
  }
}

@media screen and (max-width: 850px) {
  .register-img {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  #register {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 650px) {
  #register {
    margin-bottom: 90px;
  }
}

@media screen and (max-width: 300px) {
  #register {
    margin-bottom: 120px;
  }
}
</style>
