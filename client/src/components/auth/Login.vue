<script>
import { mapActions } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
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
        password: '',
      },
      isDisabled: true,
      serverError: [],
      errors: authErrors,
      models: authModels,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.email.$invalid || this.v$.data.password.$invalid;
        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError.length;
      return this.isDisabled;
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['userLogin']),
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      await authService.login(this.data.email, this.data.password)
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
  validations() {
    return {
      data: {
        email: {
          required: helpers.withMessage(global.REQUIRED, required),
          email: helpers.withMessage(this.errors.EMAIL, email),
        },
        password: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(this.errors.PASSWORD(this.models.PASSWORD_MIN_LEN, this.models.PASSWORD_MAX_LEN), minLength(this.models.PASSWORD_MIN_LEN)),
          maxLength: helpers.withMessage(this.errors.PASSWORD(this.models.PASSWORD_MIN_LEN, this.models.PASSWORD_MAX_LEN), maxLength(this.models.PASSWORD_MAX_LEN)),
        },
      },
    };
  },
};
</script>

<template>
  <section id="login" class="section-background">
    <ServerError v-if="serverError.length" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Login
      </h2>
      <p class="login-content">
        Please complete the login. You don't have an account? Go to
        <router-link class="navigation-link" to="/register">
          Register
        </router-link>
      </p>
    </div>
    <div class="login-content-wrapper">
      <form class="auth-form" @submit.prevent="onSubmitHandler">
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
        <button :disabled="isDisabled" class="btn">
          Login
        </button>
      </form>
      <img class="login-img img-shadow" src="../../../public/img/flowers-3992893_1920.jpg" alt="wedding_accessories">
    </div>
  </section>
</template>

<style scoped>
.login-content {
  font-size: 22px;
}

.login-content-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 80px;
  margin-bottom: 40px;
}

.login-img {
  max-width: 30%;
  max-height: 50%;
}

@media screen and (max-width: 950px) {
  .login-content-wrapper {
    flex-direction: column;
    gap: 60px;
    justify-content: center;
    align-items: center;
  }

  .login-img {
    max-width: 50%;
    max-height: 70%;
  }
}

@media screen and (max-width: 850px) {
  .login-img {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  #login {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 650px) {
  #login {
    margin-bottom: 90px;
  }
}

@media screen and (max-width: 300px) {
  #login {
    margin-bottom: 120px;
  }
}
</style>
