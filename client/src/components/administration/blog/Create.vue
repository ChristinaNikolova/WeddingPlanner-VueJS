<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import articlesService from '../../../services/articles';
import { formNames } from '../../../utils/constants/global';
import ArticleForm from './Form.vue';

const router = useRouter();
const data = ref({
  title: '',
  content: '',
  image: '',
  jumboImage: '',
  category: '',
});
const serverError = ref([]);
const isDisabled = ref(true);
const formName = ref(formNames.CREATE);

function onSubmitHandler(title, content, image, jumboImage, category) {
  articlesService
    .create(title, content, image, jumboImage, category)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }

      serverError.value = [];
      router.push({ path: `/blog/${res._id}` });
    })
    .catch(err => console.error(err));
};
function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
function onCancelFormHandler() {
  router.push({ path: '/administration' });
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
