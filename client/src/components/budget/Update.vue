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
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
const data = ref({
  title: '',
  price: '',
});
const formName = ref(formNames.UPDATE);
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
      emit('onFinish', e);
    })
    .catch(err => console.error(err));
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};

function cancelForm(e) {
  emit('onCancelFormHandler', e);
};
</script>

<template>
  <CostForm
    :initial-data="data"
    :server-error="serverError"
    :initial-disabled="isDisabled"
    @check-is-disabled="checkIsDisabled"
    @on-submit-handler="onSubmitHandler"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="cancelForm"
      />
    </template>
  </CostForm>
</template>
