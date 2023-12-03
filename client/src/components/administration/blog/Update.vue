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
      id: this.$route.params.id,
      serverError: '',
      formName: formNames.UPDATE,
      isDisabled: false,
    };
  },
  async created() {
    await articlesService
      .getById(this.id)
      .then((res) => {
        this.data.title = res.title;
        this.data.content = res.content.join(' ');
        this.data.image = res.image;
        this.data.jumboImage = res.jumboImage;
        this.data.category = res.category.id;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(title, content, image, jumboImage, category) {
      await articlesService
        .update(this.id, title, content, image, jumboImage, category)
        .then((res) => {
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
      this.$router.push({ path: `/blog/${this.id}` });
    },
  },
};
</script>

<template>
  <ArticleForm
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    :initial-disabled="isDisabled"
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
