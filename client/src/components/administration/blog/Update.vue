<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import articlesService from '../../../services/articles';
import { formNames } from '../../../utils/constants/global';
import ArticleForm from './Form.vue';

const route = useRoute();
const router = useRouter();
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  content: '',
  image: '',
  jumboImage: '',
  category: '',
});
const id = route.params.id;
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  articlesService
    .getById(id)
    .then((res) => {
      data.value.title = res.title;
      data.value.content = res.content.join(' ');
      data.value.image = res.image;
      data.value.jumboImage = res.jumboImage;
      data.value.category = res.category.id;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(title, content, image, jumboImage, category) {
  articlesService
    .update(id, title, content, image, jumboImage, category)
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
  router.push({ path: `/blog/${id}` });
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
