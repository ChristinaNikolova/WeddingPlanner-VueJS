<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { event as eventError, global } from '../../utils/constants/error';
import { event as eventModel } from '../../utils/constants/model';
import { formNames } from '../../utils/constants/global';
import datetime from '../../utils/helpers/datetime';
import event from '../../utils/validators/event';

export default {
  props: {
    initialData: {
      type: Object,
      required: true,
    },
    serverError: {
      type: String,
    },
    formName: {
      type: String,
      default: formNames.CREATE,
    },
    initialDisabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onSubmitHandler', 'checkIsDisabled'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: this.initialData,
      isDisabled: this.initialDisabled,
      models: eventModel,
      errors: eventError,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        const [hours, minutes] = datetime.getDifference(this.data.startTime, this.data.endTime);
        this.data.duration = `${hours}:${minutes}`;

        this.isDisabled = this.v$.data.title.$invalid
          || this.v$.data.startTime.$invalid
          || this.v$.data.endTime.$invalid
          || this.v$.data.duration.$invalid;
        this.$emit('checkIsDisabled', this.isDisabled);

        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError;
      this.$emit('checkIsDisabled', this.isDisabled);
      return this.isDisabled;
    },
  },
  validations() {
    return {
      data: {
        title: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), minLength(this.models.TITLE_MIN_LEN)),
          maxLength: helpers.withMessage(global.TITLE(this.models.TITLE_MIN_LEN, this.models.TITLE_MAX_LEN), maxLength(this.models.TITLE_MAX_LEN)),
        },
        startTime: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
        endTime: {
          required: helpers.withMessage(global.REQUIRED, required),
        },
        duration: {
          validTime: helpers.withMessage(this.errors.TIME, event.validTime),
        },
      },
    };
  },
  mounted() {
    this.$refs.formRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },
  methods: {
    async  onSubmitFormHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      this.$emit('onSubmitHandler', this.data.title, this.data.startTime, this.data.endTime, this.data.duration);
    },
  },
};
</script>

<template>
  <div ref="formRef" class="form-wrapper-center">
    <form class="event-form form-error-message-width" @submit.prevent="onSubmitFormHandler">
      <ServerError v-if="serverError" :errors="serverError" />
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
