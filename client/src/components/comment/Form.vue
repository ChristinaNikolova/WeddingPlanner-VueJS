<script setup>
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import { comment as models } from '../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      content: '',
    }),
  },
  initialServerError: {
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
const serverError = ref(props.initialServerError);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  content: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.CONTENT(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), minLength(models.CONTENT_MIN_LEN)),
    maxLength: helpers.withMessage(global.CONTENT(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), maxLength(models.CONTENT_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.content.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(serverError, () => {
  isDisabled.value = serverError.value.length;
  emit('checkIsDisabled', isDisabled.value);
});

onMounted(() => {
  formRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

onUpdated(() => {
  serverError.value = props.initialServerError;
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.content);
};
</script>

<template>
  <div ref="formRef" class="comment-form-wrapper">
    <form class="comment-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="serverError.length" :errors="serverError" />
      <AppTextArea
        v-model.trim="v$.content.$model"
        :errors="v$?.content.$errors"
        name="content"
        rows="10"
        label="Content"
      />
      <slot name="button" />
    </form>
  </div>
</template>

<style>
.comment-form-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}

@media screen and (max-width: 850px) {
  .comment-form-wrapper {
    margin: unset;
  }
}
</style>
