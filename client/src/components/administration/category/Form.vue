<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref, watch } from 'vue';
import Bottom from '../../shared/images/Bottom.vue';
import { formNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { category as models } from '../../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      image: '',
    }),
  },
  serverError: {
    type: Array,
  },
  formName: {
    type: String,
    default: formNames.CREATE,
  },
  initialDisabled: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['onSubmitHandler', 'checkIsDisabled']);
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  name: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), minLength(models.NAME_MIN_LEN)),
    maxLength: helpers.withMessage(global.NAME(models.NAME_MIN_LEN, models.NAME_MAX_LEN), maxLength(models.NAME_MAX_LEN)),
  },
  image: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.name.$invalid || v$.value.image.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.name, data.image);
}
</script>

<template>
  <section class="section-background">
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ props.formName }} Category
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="create-category-form form-width" @submit.prevent="onSubmitFormHandler">
        <AppInput
          v-model.trim="v$.name.$model"
          :errors="v$?.name.$errors"
          name="name"
          type="text"
          label="Name"
        />
        <AppInput
          v-model.trim="v$.image.$model"
          :errors="v$?.image.$errors"
          name="image"
          type="url"
          label="Image"
        />
        <slot name="button" />
      </form>
      <Bottom />
    </div>
  </section>
</template>

<style scoped>
.create-category-form {
  margin-bottom: 200px;
}

@media screen and (max-width: 1000px) {
  .create-category-form {
    margin-bottom: 80px;
  }
}

@media screen and (max-width: 800px) {
  .create-category-form {
    margin-bottom: 40px;
  }
}
</style>
