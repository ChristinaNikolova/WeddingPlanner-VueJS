<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { article as models } from '../../../utils/constants/model';
import { article as errors, global } from '../../../utils/constants/error';
import { formNames } from '../../../utils/constants/global';
import categoriesService from '../../../services/categories';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      image: '',
      jumboImage: '',
      category: '',
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
const categories = ref([]);

const rules = computed(() => ({
  title: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
  },
  content: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(errors.CONTENT(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), minLength(models.CONTENT_MIN_LEN)),
    maxLength: helpers.withMessage(errors.CONTENT(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), maxLength(models.CONTENT_MAX_LEN)),
  },
  image: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
  jumboImage: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
  category: {
    required: helpers.withMessage(errors.CATEGORY, required),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.title.$invalid
  || v$.value.content.$invalid
  || v$.value.image.$invalid
  || v$.value.jumboImage.$invalid
  || v$.value.category.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

onMounted(() => {
  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.title, data.content, data.image, data.jumboImage, data.category);
};
</script>

<template>
  <section class="section-background">
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ props.formName }} Article
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="form-width" @submit.prevent="onSubmitFormHandler">
        <AppInput
          v-model.trim="v$.title.$model"
          :errors="v$?.title.$errors"
          name="title"
          type="text"
          label="Title"
        />
        <AppTextArea
          v-model.trim="v$.content.$model"
          :errors="v$?.content.$errors"
          name="content"
          rows="16"
          label="Content"
        />
        <AppInput
          v-model.trim="v$.image.$model"
          :errors="v$?.image.$errors"
          name="image"
          type="url"
          label="Image"
        />
        <AppInput
          v-model.trim="v$.jumboImage.$model"
          :errors="v$?.jumboImage.$errors"
          name="jumboImage"
          type="url"
          label="Jumbo Image"
        />
        <AppSelect
          v-model.trim="v$.category.$model"
          :errors="v$?.category.$errors"
          name="category"
          label="Category"
          :categories="categories"
        />
        <slot name="button" />
      </form>
    </div>
  </section>
</template>
