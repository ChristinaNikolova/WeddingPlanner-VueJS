<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import Bottom from '../../shared/images/Bottom.vue';
import { formNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { category as categoryModels } from '../../../utils/constants/model';

export default {
  components: { Bottom },
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    serverError: {
      type: String,
    },
    formName: {
      type: String,
      default: formNames.CREATE,
    },
    initialDisabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onSubmitHandler', 'checkIsDisabled'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: this.initialData,
      isDisabled: this.initialDisabled,
      models: categoryModels,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.name.$invalid
          || this.v$.data.image.$invalid;
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
        name: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), minLength(this.models.NAME_MIN_LEN)),
          maxLength: helpers.withMessage(global.NAME(this.models.NAME_MIN_LEN, this.models.NAME_MAX_LEN), maxLength(this.models.NAME_MAX_LEN)),
        },
        image: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
      },
    };
  },
  methods: {
    async onSubmitFormHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }
      this.$emit('onSubmitHandler', this.data.name, this.data.image);
    },
  },
};
</script>

<template>
  <section class="section-background">
    <ServerError v-if="serverError" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ formName }} Category
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="create-category-form form-width" @submit.prevent="onSubmitFormHandler">
        <AppInput
          v-model.trim="v$.data.name.$model"
          :errors="v$?.data.name.$errors"
          name="name"
          type="text"
          label="Name"
        />
        <AppInput
          v-model.trim="v$.data.image.$model"
          :errors="v$?.data.image.$errors"
          name="image"
          type="url"
          label="Image"
        />
        <slot name="button" />
      </form>
      <Bottom />
    </div>
  </section>
</template>

<style scoped>
.create-category-form {
  margin-bottom: 200px;
}

@media screen and (max-width: 1000px) {
  .create-category-form {
    margin-bottom: 80px;
  }
}

@media screen and (max-width: 800px) {
  .create-category-form {
    margin-bottom: 40px;
  }
}
</style>
