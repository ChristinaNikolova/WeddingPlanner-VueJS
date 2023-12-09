<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { event as errors, global } from '../../utils/constants/error';
import { event as models } from '../../utils/constants/model';
import datetime from '../../utils/helpers/datetime';
import event from '../../utils/validators/event';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      startTime: '',
      endTime: '',
      duration: '',
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
const data = ref(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  data: {
    title: {
      required: helpers.withMessage(global.REQUIRED, required),
      minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
      maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
    },
    startTime: {
      required: helpers.withMessage(global.REQUIRED, required),
    },
    endTime: {
      required: helpers.withMessage(global.REQUIRED, required),
    },
    duration: {
      validTime: helpers.withMessage(errors.TIME, event.validTime),
    },
  },
}));

const v$ = useVuelidate(rules, { data });

watch(data, () => {
  const [hours, minutes] = datetime.getDifference(data.value.startTime, data.value.endTime);
  data.value.duration = `${hours}:${minutes}`;

  isDisabled.value = v$.value.data.title.$invalid
  || v$.value.data.startTime.$invalid
  || v$.value.data.endTime.$invalid
  || v$.value.data.duration.$invalid;
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

  emit('onSubmitHandler', data.value.title, data.value.startTime, data.value.endTime, data.value.duration);
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="event-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="props.serverError.length" :errors="props.serverError" />
      <AppInput
        v-model.trim="v$.data.title.$model"
        :errors="v$?.data.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppInput
        v-model.trim="v$.data.startTime.$model"
        :errors="v$?.data.startTime.$errors"
        name="startTime"
        type="time"
        label="Start Time"
      />
      <AppInput
        v-model.trim="v$.data.endTime.$model"
        :errors="v$?.data.endTime.$errors"
        name="endTime"
        type="time"
        label="End Time"
      />
      <AppInput
        v-model="v$.data.duration.$model"
        :errors="v$?.data.startTime.$dirty ? v$?.data.duration.$silentErrors : []"
        name="duration"
        type="text"
        label="Duration"
        :is-readonly="true"
      />
      <slot name="button" />
    </form>
  </div>
</template>

<style scoped>
.event-form {
  width: 26%;
}

@media screen and (max-width: 1800px) {
  .event-form {
    width: 80%;
  }
}
</style>
