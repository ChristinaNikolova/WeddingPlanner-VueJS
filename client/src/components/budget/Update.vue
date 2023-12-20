<script setup>
import { onMounted, ref } from 'vue';
import { formNames } from '../../utils/constants/global';
import costsService from '../../services/costs';
import CostForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  costId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  price: '',
});
const isDisabled = ref(false);
const serverError = ref([]);

onMounted(() => {
  costsService
    .getById(props.plannerId, props.costId)
    .then((res) => {
      data.value.title = res.title;
      data.value.price = res.price;
    })
    .catch(err => console.error(err));
});

function onSubmitHandler(e, title, price) {
  costsService
    .update(props.costId, title, price)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      emit('finish', e);
    })
    .catch(err => console.error(err));
};

function onCancelForm(e) {
  emit('onCancelFormHandler', e);
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
</script>

<template>
  <CostForm
    :initial-data="data"
    :server-error="serverError"
    :initial-disabled="isDisabled"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelForm"
      />
    </template>
  </CostForm>
</template>
