<script>
import articlesService from '../../../services/articles';
import { formNames } from '../../../utils/constants/global';
import ArticleForm from './Form.vue';

export default {
  components: { ArticleForm },
  data() {
    return {
      data: {
        title: '',
        content: '',
        image: '',
        jumboImage: '',
        category: '',
      },
      serverError: '',
      isDisabled: true,
      formName: formNames.CREATE,
    };
  },
  methods: {
    async onSubmitHandler(title, content, image, jumboImage, category) {
      await articlesService
        .create(title, content, image, jumboImage, category)
        .then(async (res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = '';
          this.$router.push({ path: `/blog/${res._id}` });
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = disable;
    },
    onCancelFormHandler() {
      this.$router.push({ path: '/administration' });
    },
  },
};
</script>

<template>
  <ArticleForm
    :initial-data="data"
    :server-error="serverError"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </template>
  </ArticleForm>
</template>
