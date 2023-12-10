<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import CategoryForm from './Form.vue';

const router = useRouter();
const formName = formNames.CREATE;
const data = ref({
  name: '',
  image: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(name, image) {
  categoriesService
    .create(name, image)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      router.push({ path: '/administration/categories' });
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
