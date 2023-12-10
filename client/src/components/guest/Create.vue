<script setup>
import { nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import guestsService from '../../services/guests';
import { formNames } from '../../utils/constants/global';
import GuestForm from './Form.vue';

const props = defineProps({
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
const v$ = useVuelidate();
const formName = formNames.CREATE;
const data = ref({
  firstName: '',
  lastName: '',
  age: 'adult',
  role: '',
  gender: 'male',
  side: 'bride',
  table: '',
  mainDish: 'no info',
  confirmed: 'no',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
  guestsService
    .create(props.plannerId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }

      data.value.firstName = '';
      data.value.lastName = '';
      data.value.gender = 'male';
      data.value.age = 'adult';
      data.value.side = 'bride';
      data.value.role = '';
      data.value.table = '';
      data.value.mainDish = 'no info';
      data.value.confirmed = 'no';
      nextTick(() => {
        v$.value.$reset();
      });

      serverError.value = [];
      emit('onFinish');
    })
    .catch(err => console.error(err));
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};

function cancelForm() {
  emit('onCancelFormHandler');
};
</script>

<template>
  <GuestForm
    v-if="!props.isHidden"
    :initial-data="data"
    :server-error="serverError"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #button>
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="cancelForm"
      />
    </template>
  </GuestForm>
</template>
