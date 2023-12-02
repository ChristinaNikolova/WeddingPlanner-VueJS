<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { article as articleModels } from '../../../utils/constants/model';
import { article as articleErrors, global } from '../../../utils/constants/error';
import { formNames } from '../../../utils/constants/global';
import categoriesService from '../../../services/categories';

export default {
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
      categories: [],
      models: articleModels,
      errors: articleErrors,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        this.isDisabled = this.v$.data.title.$invalid
          || this.v$.data.content.$invalid
          || this.v$.data.image.$invalid
          || this.v$.data.jumboImage.$invalid
          || this.v$.data.category.$invalid;
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
  async created() {
    await categoriesService
      .all()
      .then(data => this.categories = data)
      .catch(err => console.error(err));
  },
  validations() {
    return {
      data: {
        title: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), minLength(this.models.TITLE_MIN_LEN)),
          maxLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), maxLength(this.models.TITLE_MAX_LEN)),
        },
        content: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(this.errors.CONTENT(this.models.CONTENT_MIN_LEN, this.models.CONTENT_MAX_LEN), minLength(this.models.CONTENT_MIN_LEN)),
          maxLength: helpers.withMessage(this.errors.CONTENT(this.models.CONTENT_MIN_LEN, this.models.CONTENT_MAX_LEN), maxLength(this.models.CONTENT_MAX_LEN)),
        },
        image: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
        jumboImage: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
        category: {
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

      this.$emit('onSubmitHandler', this.data.title, this.data.content, this.data.image, this.data.jumboImage, this.data.category);
    },
  },
};
</script>

<template>
  <section class="section-background">
    <ServerError v-if="serverError" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ formName }} Article
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="form-width" @submit.prevent="onSubmitFormHandler">
        <AppInput
          v-model.trim="v$.data.title.$model"
          :errors="v$?.data.title.$errors"
          name="title"
          type="text"
          label="Title"
        />
        <AppTextArea
          v-model.trim="v$.data.content.$model"
          :errors="v$?.data.content.$errors"
          name="content"
          rows="16"
          label="Content"
        />
        <AppInput
          v-model.trim="v$.data.image.$model"
          :errors="v$?.data.image.$errors"
          name="image"
          type="url"
          label="Image"
        />
        <AppInput
          v-model.trim="v$.data.jumboImage.$model"
          :errors="v$?.data.jumboImage.$errors"
          name="jumboImage"
          type="url"
          label="Jumbo Image"
        />
        <AppSelect
          v-model.trim="v$.data.category.$model"
          :errors="v$?.data.category.$errors"
          name="category"
          label="Category"
          :categories="categories"
        />
        <slot name="button" />
      </form>
    </div>
  </section>
</template>
