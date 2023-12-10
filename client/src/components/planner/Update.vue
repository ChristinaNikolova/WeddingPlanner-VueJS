<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import plannersService from '../../services/planners';
import { formNames } from '../../utils/constants/global';
import PlannerForm from './Form.vue';

const formName = formNames.UPDATE;

const route = useRoute();
const router = useRouter();
const id = route.params.id;
let brideId = '';
let groomId = '';
const data = ref({
  description: '',
  date: '',
  budget: '',
  location: '',
  bride: '',
  groom: '',
});
const serverError = ref([]);

onMounted(() => {
  plannersService
    .getById(id)
    .then((res) => {
      data.value.description = res.description;
      data.value.date = res.date;
      data.value.budget = res.budget;
      data.value.location = res.location;
      data.value.bride = res.bride;
      brideId = res.brideId;
      data.value.groom = res.groom;
      groomId = res.groomId;
    }).catch(err => console.error(err));
});

function onSubmitHandler(description, date, budget, location, bride, groom) {
  plannersService
    .update(id, description, date, budget, location, bride, brideId, groom, groomId)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      router.push({ path: '/plan' });
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
