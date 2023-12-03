<script>
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import CategoryForm from './Form.vue';

export default {
  components: { CategoryForm },
  data() {
    return {
      data: {
        name: '',
        image: '',
      },
      serverError: '',
      isDisabled: true,
      formName: formNames.CREATE,
    };
  },
  methods: {
    async onSubmitHandler(name, image) {
      await categoriesService
        .create(name, image)
        .then(async (res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = '';
          this.$router.push({ path: '/administration/categories' });
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
  <CategoryForm
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
  </CategoryForm>
</template>
