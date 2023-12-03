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
      id: this.$route.params.id,
      formName: formNames.UPDATE,
      serverError: [],
      isDisabled: false,
    };
  },
  async created() {
    await categoriesService
      .getById(this.id)
      .then((res) => {
        this.data.name = res.name;
        this.data.image = res.image;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(name, image) {
      await categoriesService
        .update(this.id, name, image)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = [];
          this.$router.push({ path: '/administration/categories' });
        })
        .catch(err => console.error(err));
    },
    checkIsDisabled(disable) {
      this.isDisabled = disable;
    },
    onCancelFormHandler() {
      this.$router.push({ path: '/administration/categories' });
    },
  },
};
</script>

<template>
  <CategoryForm
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
  </CategoryForm>
</template>
