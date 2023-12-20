<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import CategoryForm from './Form.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const formName = formNames.UPDATE;
const data = ref({
  name: '',
  image: '',
});
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  categoriesService
    .getById(id)
    .then((res) => {
      data.value.name = res.name;
      data.value.image = res.image;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(name, image) {
  categoriesService
    .update(id, name, image)
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

function onCancelFormHandler() {
  router.push({ path: '/administration/categories' });
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
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
