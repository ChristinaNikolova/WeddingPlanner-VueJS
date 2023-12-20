<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import costsService from '../../services/costs';
import { formNames } from '../../utils/constants/global';
import CostForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  category: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'finish']);
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  title: '',
  price: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(e, title, price) {
  costsService
    .create(props.plannerId, title, price, props.category)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      data.value.title = '';
      data.value.price = '';
      nextTick(() => {
        v$.value.$reset();
      });
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
