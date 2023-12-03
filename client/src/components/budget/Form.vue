<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required } from '@vuelidate/validators';
import { styleNames } from '../../utils/constants/global';
import { cost as costErrors, global } from '../../utils/constants/error';
import { cost as costModels } from '../../utils/constants/model';

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
    return { v$: useVuelidate() };
  },
  data() {
    return {
      data: this.initialData,
      isDisabled: this.initialDisabled,
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
        title: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), minLength(this.models.TITLE_MIN_LEN)),
          maxLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), maxLength(this.models.TITLE_MAX_LEN)),
        },
        price: {
          required: helpers.withMessage(global.REQUIRED, required),
          minValue: helpers.withMessage(this.errors.PRICE, minValue(this.models.PRICE_MIN)),
        },
      },
    };
  },
  mounted() {
    this.$refs.formRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  methods: {
    async onSubmitFormHandler(e) {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }
      this.$emit('onSubmitHandler', e, this.data.title, this.data.price);
    },
  },
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler($event)">
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
      <slot name="button" />
    </form>
  </div>
</template>
