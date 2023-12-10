<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { roles } from '../../utils/constants/global';
import { global } from '../../utils/constants/error';
import { guest as models } from '../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      firstName: '',
      lastName: '',
      age: 'adult',
      role: '',
      gender: 'male',
      side: 'bride',
      table: '',
      mainDish: 'no info',
      confirmed: 'no',
    }),
  },
  serverError: {
    type: Array,
  },
  initialDisabled: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['onSubmitHandler', 'checkIsDisabled']);
const formRef = ref(null);
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);

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
  role: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
  table: {},
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.firstName.$invalid || v$.value.lastName.$invalid || v$.value.role.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

onMounted(() => {
  formRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.firstName, data.lastName, data.gender, data.age, data.side, data.role, data.table, data.mainDish, data.confirmed);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="guest-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
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
        v-model.trim="v$.role.$model"
        :errors="v$?.role.$errors"
        name="role"
        label="Role"
        :categories="roles"
      />
      <AppInput
        v-model.trim="v$.table.$model"
        :errors="v$?.table.$errors"
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
  width: 30%;
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
