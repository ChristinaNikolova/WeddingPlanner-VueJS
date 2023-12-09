<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required } from '@vuelidate/validators';
import { styleNames } from '../../utils/constants/global';
import { cost as errors, global } from '../../utils/constants/error';
import { cost as models } from '../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      price: '',
    }),
  },
  serverError: {
    type: Array,
  },
  initialDisabled: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['onSubmitHandler', 'checkIsDisabled']);
let currentStyle = styleNames.NONE;
const formRef = ref(null);
const data = ref(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  data: {
    title: {
      required: helpers.withMessage(global.REQUIRED, required),
      minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
      maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
    },
    price: {
      required: helpers.withMessage(global.REQUIRED, required),
      minValue: helpers.withMessage(errors.PRICE, minValue(models.PRICE_MIN)),
    },
  },
}));

const v$ = useVuelidate(rules, { data });

watch(data, () => {
  currentStyle = styleNames.FLEX;
  isDisabled.value = v$.value.data.title.$invalid || v$.value.data.price.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

onMounted(() => {
  formRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

async function onSubmitFormHandler(e) {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  emit('onSubmitHandler', e, data.value.title, data.value.price);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler($event)">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
      <AppInput
        v-model.trim="v$.data.title.$model"
        :errors="v$?.data.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppInput
        v-model.trim="v$.data.price.$model"
        :errors="v$?.data.price.$errors"
        name="price"
        type="number"
        label="Price"
      />
      <slot name="button" />
    </form>
  </div>
</template>
