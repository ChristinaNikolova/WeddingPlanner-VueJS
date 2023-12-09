<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import plannersService from '../../services/planners';
import { formNames } from '../../utils/constants/global';
import PlannerForm from './Form.vue';

const router = useRouter();
const formName = formNames.CREATE;
const data = ref({
  description: '',
  date: '',
  budget: '',
  location: '',
  bride: '',
  groom: '',
});
const serverError = ref([]);

function onSubmitHandler(description, date, budget, location, bride, groom) {
  plannersService
    .create(description, date, budget, location, bride, groom)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      router.push({ path: `/plan/${res._id}` });
    })
    .catch(err => console.error(err));
};
</script>

<template>
  <PlannerForm
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
  />
</template>
