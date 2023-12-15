<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { useAuthStore } from '../../store/auth';
import { auth as errors, global } from '../../utils/constants/error';
import { auth as models } from '../../utils/constants/model';
import authService from '../../services/auth';

const store = useAuthStore();
const router = useRouter();
const data = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  repass: '',
});
const isDisabled = ref(true);
const serverError = ref([]);

const rules = computed(() => ({
  firstName: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), minLength(models.NAME_MIN_LEN)),
    maxLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), maxLength(models.NAME_MAX_LEN)),
  },
  lastName: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), minLength(models.NAME_MIN_LEN)),
    maxLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), maxLength(models.NAME_MAX_LEN)),
  },
  email: {
    required: helpers.withMessage(global.REQUIRED, required),
    email: helpers.withMessage(errors.EMAIL, email),
  },
  password: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), minLength(models.PASSWORD_MIN_LEN)),
    maxLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), maxLength(models.PASSWORD_MAX_LEN)),
  },
  repass: {
    sameAs: helpers.withMessage(errors.REPEAT_PASSWORD, sameAs(data.password)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.email.$invalid
  || v$.value.firstName.$invalid
  || v$.value.lastName.$invalid
  || v$.value.password.$invalid
  || v$.value.repass.$invalid;
}, { deep: true });

watch(serverError, () => {
  isDisabled.value = serverError.value.length;
});

async function onSubmitHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  authService.register(data.firstName, data.lastName, data.email, data.password)
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
        src="/img/wedding-634526_1280.jpg"
        alt="bride_accessories"
      >
      <form class="auth-form" @submit.prevent="onSubmitHandler">
        <AppInput
          v-model.trim="v$.firstName.$model"
          :errors="v$?.firstName.$errors"
          name="firstName"
          type="text"
          label="First Name"
        />
        <AppInput
          v-model.trim="v$.lastName.$model"
          :errors="v$?.lastName.$errors"
          name="lastName"
          type="text"
          label="Last Name"
        />
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
        <AppInput
          v-model.trim="v$.repass.$model"
          :errors="v$?.repass.$errors"
          name="repass"
          type="password"
          label="Repeat Password"
        />
        <button :disabled="isDisabled" class="btn" type="submit">
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
