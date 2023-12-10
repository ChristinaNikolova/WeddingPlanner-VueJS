<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { styleNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { task as models } from '../../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
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
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  title: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
  },
  description: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), minLength(models.DESC_MIN_LEN)),
    maxLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), maxLength(models.DESC_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  currentStyle = styleNames.FLEX;
  isDisabled.value = v$.value.title.$invalid || v$.value.description.$invalid;
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
  emit('onSubmitHandler', e, data.title, data.description);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
      <AppInput
        v-model.trim="v$.title.$model"
        :errors="v$?.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppTextArea
        v-model.trim="v$.description.$model"
        :errors="v$?.description.$errors"
        name="description"
        rows="4"
        label="Description"
      />
      <slot name="button" />
    </form>
  </div>
</template>
