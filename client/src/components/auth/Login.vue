<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import authService from '../../services/auth';
import { auth as errors, global } from '../../utils/constants/error';
import { auth as models } from '../../utils/constants/model';
import { useAuthStore } from '../../store/auth';

const store = useAuthStore();
const router = useRouter();
const data = reactive({
  email: '',
  password: '',
});
const isDisabled = ref(true);
const serverError = ref([]);

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(global.REQUIRED, required),
    email: helpers.withMessage(errors.EMAIL, email),
  },
  password: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), minLength(models.PASSWORD_MIN_LEN)),
    maxLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), maxLength(models.PASSWORD_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.email.$invalid || v$.value.password.$invalid;
}, { deep: true });

watch(serverError, () => {
  isDisabled.value = serverError.value.length;
});

async function onSubmitHandler() {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  authService.login(data.email, data.password)
    .then((res) => {
      if (!res.accessToken) {
        serverError.value = res.message;
        return;
      }
      store.userLogin(res);
      router.push({ path: '/' });
    })
    .catch(err => console.error(err));
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
          v-model.trim="v$.email.$model"
          :errors="v$?.email.$errors"
          name="email"
          type="email"
          label="Email"
        />
        <AppInput
          v-model.trim="v$.password.$model"
          :errors="v$?.password.$errors"
          name="password"
          type="password"
          label="Password"
        />
        <button :disabled="isDisabled" class="btn" type="submit">
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
