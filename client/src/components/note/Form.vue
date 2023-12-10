<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import { note as models } from '../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
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
const formRef = ref(null);
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  description: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), minLength(models.DESC_MIN_LEN)),
    maxLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), maxLength(models.DESC_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.description.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

onMounted(() => {
  formRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  emit('onSubmitHandler', data.description);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
      <AppTextArea
        v-model.trim="v$.description.$model"
        :errors="v$?.description.$errors"
        name="description"
        rows="10"
        label="Note"
      />
      <slot name="button" />
    </form>
  </div>
</template>
