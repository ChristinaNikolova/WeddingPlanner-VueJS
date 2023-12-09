<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required } from '@vuelidate/validators';
import { planner as errors, global } from '../../utils/constants/error';
import { planner as models } from '../../utils/constants/model';
import planner from '../../utils/validators/planner';

const props = defineProps({
  initialData: {
    description: '',
    date: '',
    budget: null,
    location: '',
    bride: '',
    groom: '',
  },
  serverError: {
    type: Array,
  },
  formName: {
    type: String,
    default: 'Create',
  },
});
const emit = defineEmits(['onSubmitHandler']);
const router = useRouter();
const data = reactive(props.initialData);
const isDisabled = ref(true);

const rules = computed(() => ({
  description: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.DESC(models.DESCRIPTION_MIN_LEN, models.DESCRIPTION_MAX_LEN), minLength(models.DESCRIPTION_MIN_LEN)),
    maxLength: helpers.withMessage(global.DESC(models.DESCRIPTION_MIN_LEN, models.DESCRIPTION_MAX_LEN), maxLength(models.DESCRIPTION_MAX_LEN)),
  },
  date: {
    required: helpers.withMessage(global.REQUIRED, required),
    validDate: helpers.withMessage(errors.DATE, planner.validDate),
  },
  budget: {
    required: helpers.withMessage(global.REQUIRED, required),
    minValue: helpers.withMessage(errors.BUDGET, minValue(models.BUDGET_MIN)),
  },
  location: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(errors.LOCATION(models.LOCATION_MIN_LEN, models.LOCATION_MAX_LEN), minLength(models.LOCATION_MIN_LEN)),
    maxLength: helpers.withMessage(errors.LOCATION(models.LOCATION_MIN_LEN, models.LOCATION_MAX_LEN), maxLength(models.LOCATION_MAX_LEN)),
  },
  bride: {
    required: helpers.withMessage(global.REQUIRED, required),
    hasTwoNames: helpers.withMessage(errors.NAME, planner.hasTwoNames),
  },
  groom: {
    required: helpers.withMessage(global.REQUIRED, required),
    hasTwoNames: helpers.withMessage(errors.NAME, planner.hasTwoNames),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.description.$invalid
  || v$.value.date.$invalid
  || v$.value.budget.$invalid
  || v$.value.location.$invalid
  || v$.value.bride.$invalid
  || v$.value.groom.$invalid;
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
});

function onCancelFormHandler() {
  router.push({ path: '/plan' });
};

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  emit('onSubmitHandler', data.description, data.date, data.budget, data.location, data.bride, data.groom);
};
</script>

<template>
  <section class="section-background">
    <ServerError v-if="serverError.length" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ formName }} Planner
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="form-width" @submit.prevent="onSubmitFormHandler">
        <AppTextArea
          v-model.trim="v$.description.$model"
          :errors="v$?.description.$errors"
          name="description"
          rows="8"
          label="Description"
        />
        <AppInput
          v-model.trim="v$.date.$model"
          :errors="v$?.date.$errors"
          name="date"
          type="text"
          label="Date"
        />
        <AppInput
          v-model.trim="v$.budget.$model"
          :errors="v$?.budget.$errors"
          name="budget"
          type="number"
          label="Budget"
        />
        <AppInput
          v-model.trim="v$.location.$model"
          :errors="v$?.location.$errors"
          name="location"
          type="text"
          label="Location"
        />
        <AppInput
          v-model.trim="v$.bride.$model"
          :errors="v$?.bride.$errors"
          name="bride"
          type="text"
          label="Bride"
        />
        <AppInput
          v-model.trim="v$.groom.$model"
          :errors="v$?.groom.$errors"
          name="groom"
          type="text"
          label="Groom"
        />
        <FormButton
          :form-name="formName"
          :is-disabled="isDisabled"
          @on-cancel-button-form-handler="onCancelFormHandler"
        />
      </form>
    </div>
  </section>
</template>
