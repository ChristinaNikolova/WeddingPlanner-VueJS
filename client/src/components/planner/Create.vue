<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required } from '@vuelidate/validators';
import FormButton from '../shared/buttons/Form.vue';
import { global, planner as plannerErrors } from '../../utils/constants/error';
import { planner as plannerModels } from '../../utils/constants/model';
import planner from '../../utils/validators/planner';
import { formNames } from '../../utils/constants/global';
import plannersService from '../../services/planners';

export default {
  components: { FormButton },
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: {
        description: '',
        date: '',
        budget: null,
        location: '',
        bride: '',
        groom: '',
      },
      formName: formNames.CREATE,
      isDisabled: true,
      serverError: '',
      errors: plannerErrors,
      models: plannerModels,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.description.$invalid
          || this.v$.data.date.$invalid
          || this.v$.data.budget.$invalid
          || this.v$.data.location.$invalid
          || this.v$.data.bride.$invalid
          || this.v$.data.groom.$invalid;
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
        description: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.DESC(this.models.DESCRIPTION_MIN_LEN, this.models.DESCRIPTION_MAX_LEN), minLength(this.models.DESCRIPTION_MIN_LEN)),
          maxLength: helpers.withMessage(global.DESC(this.models.DESCRIPTION_MIN_LEN, this.models.DESCRIPTION_MAX_LEN), maxLength(this.models.DESCRIPTION_MAX_LEN)),
        },
        date: {
          required: helpers.withMessage(global.REQUIRED, required),
          validDate: helpers.withMessage(this.errors.DATE, planner.validDate),
        },
        budget: {
          required: helpers.withMessage(global.REQUIRED, required),
          minValue: helpers.withMessage(this.errors.BUDGET, minValue(this.models.BUDGET_MIN)),
        },
        location: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(this.errors.LOCATION(this.models.LOCATION_MIN_LEN, this.models.LOCATION_MAX_LEN), minLength(this.models.LOCATION_MIN_LEN)),
          maxLength: helpers.withMessage(this.errors.LOCATION(this.models.LOCATION_MIN_LEN, this.models.LOCATION_MAX_LEN), maxLength(this.models.LOCATION_MAX_LEN)),
        },
        bride: {
          required: helpers.withMessage(global.REQUIRED, required),
          hasTwoNames: helpers.withMessage(this.errors.NAME, planner.hasTwoNames),
        },
        groom: {
          required: helpers.withMessage(global.REQUIRED, required),
          hasTwoNames: helpers.withMessage(this.errors.NAME, planner.hasTwoNames),
        },
      },
    };
  },
  methods: {
    onCancelFormHandler() {
      this.$router.push({ path: '/plan' });
    },
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await plannersService
        .create(this.data.description, this.data.date, this.data.budget, this.data.location, this.data.bride, this.data.groom)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.$router.replace({ path: `/plan/${res._id}` });
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <section class="section-background">
    <ServerError v-if="serverError" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ formName }} Planner
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="form-width" @submit.prevent="onSubmitHandler">
        <AppTextArea
          v-model.trim="v$.data.description.$model"
          :errors="v$?.data.description.$errors"
          name="description"
          rows="8"
          label="Description"
        />
        <AppInput
          v-model.trim="v$.data.date.$model"
          :errors="v$?.data.date.$errors"
          name="date"
          type="text"
          label="Date"
        />
        <AppInput
          v-model.trim="v$.data.budget.$model"
          :errors="v$?.data.budget.$errors"
          name="budget"
          type="number"
          label="Budget"
        />
        <AppInput
          v-model.trim="v$.data.location.$model"
          :errors="v$?.data.location.$errors"
          name="location"
          type="text"
          label="Location"
        />
        <AppInput
          v-model.trim="v$.data.bride.$model"
          :errors="v$?.data.bride.$errors"
          name="bride"
          type="text"
          label="Bride"
        />
        <AppInput
          v-model.trim="v$.data.groom.$model"
          :errors="v$?.data.groom.$errors"
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
