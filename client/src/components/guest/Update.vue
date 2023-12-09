<script setup>
import { onMounted, ref } from 'vue';
import guestsService from '../../services/guests';
import { formNames } from '../../utils/constants/global';
import GuestForm from './Form.vue';

const props = defineProps({
  guestId: {
    type: String,
    required: true,
    default: '',
  },
  plannerId: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onCancelFormHandler', 'onFinish']);
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
const formName = ref(formNames.UPDATE);
const isDisabled = ref(false);

onMounted(() => {
  guestsService
    .getById(props.plannerId, props.guestId)
    .then((res) => {
      data.value.firstName = res.firstName;
      data.value.lastName = res.lastName;
      data.value.age = res.age;
      data.value.role = res.role;
      data.value.gender = res.gender;
      data.value.side = res.side;
      data.value.table = res.table;
      data.value.mainDish = res.mainDish;
      data.value.confirmed = res.confirmed ? 'yes' : 'no';
    }).catch(err => console.error(err));
});

function onSubmitHandler(firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
  guestsService
    .update(props.guestId, firstName, lastName, gender, age, side, role, table, mainDish, confirmed)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }

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
    :initial-data="data"
    :initial-disabled="isDisabled"
    :server-error="serverError"
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
  </GuestForm>
</template>
