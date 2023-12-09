<script setup>
import { computed, onMounted, ref, watch } from 'vue';
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
const data = ref(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  data: {
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
  },
}));

const v$ = useVuelidate(rules, { data });

watch(data, () => {
  isDisabled.value = v$.value.data.firstName.$invalid || v$.value.data.lastName.$invalid || v$.value.data.role.$invalid;
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

  emit('onSubmitHandler', data.value.firstName, data.value.lastName, data.value.gender, data.value.age, data.value.side, data.value.role, data.value.table, data.value.mainDish, data.value.confirmed);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="guest-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
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
