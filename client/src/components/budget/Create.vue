<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required } from '@vuelidate/validators';
import { formNames, styleNames } from '../../utils/constants/global';
import costsService from '../../services/costs';
import { cost as costErrors, global } from '../../utils/constants/error';
import { cost as costModels } from '../../utils/constants/model';
import FormButton from '../shared/buttons/Form.vue';

export default {
  components: { FormButton },
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    loadCosts: {
      type: Function,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: {
        title: '',
        price: null,
      },
      isDisabled: true,
      serverError: '',
      formName: formNames.CREATE,
      currentStyle: styleNames.NONE,
      errors: costErrors,
      models: costModels,
    };
  },
  watch: {
    data: {
      handler() {
        this.currentStyle = styleNames.FLEX;
        this.isDisabled = this.v$.data.title.$invalid || this.v$.data.price.$invalid;
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
        title: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), minLength(this.models.TITLE_MIN_LEN)),
          maxLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), maxLength(this.models.TITLE_MAX_LEN)),
        },
        price: {
          required: helpers.withMessage(global.REQUIRED, required),
          minValue: helpers.withMessage(this.errors.PRICE, minValue(this.models.TITLE_MIN_LEN)),
        },
      },
    };
  },
  methods: {
    async onSubmitHandler(e) {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      costsService
        .create(this.plannerId, this.data.title, this.data.price, this.category)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.serverError = '';
          this.currentStyle = styleNames.NONE;
          this.onCancelFormHandler(e);
          this.loadCosts();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <div class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitHandler">
      <ServerError v-if="serverError" :errors="serverError" />
      <AppInput
        v-model.trim="v$.data.title.$model"
        :errors="v$?.data.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppInput
        v-model.trim="v$.data.price.$model"
        :errors="v$?.data.price.$errors"
        name="price"
        type="number"
        label="Price"
      />
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>
