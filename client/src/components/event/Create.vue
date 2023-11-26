<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { event as eventError, global } from '../../utils/constants/error';
import { event as eventModel } from '../../utils/constants/model';
import eventsService from '../../services/events';
import { addButtonTexts, formNames } from '../../utils/constants/global';
import datetime from '../../utils/helpers/datetime';
import event from '../../utils/validators/event';

export default {
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
    onShowFormHandler: {
      type: Function,
      required: true,
    },
    loadEvents: {
      type: Function,
      required: true,
    },
  },
  emits: ['onShowFormHandler', 'onCancelFormHandler'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: {
        title: '',
        startTime: '',
        endTime: '',
        duration: '',
      },

      formName: formNames.CREATE,
      addButtonTexts,
      serverError: '',
      isDisabled: true,
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

        return this.isDisabled;
      },
      deep: true,
    },
    serverError() {
      this.isDisabled = this.serverError;
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
  methods: {
    async onSubmitHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      await eventsService
        .create(this.plannerId, this.data.title, this.data.startTime, this.data.endTime, this.data.duration)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          // todo extract function
          this.v$.data.title = '';
          this.v$.data.startTime = '';
          this.v$.data.endTime = '';
          this.v$.data.duration = '';
          this.serverError = '';
          this.onCancelFormHandler();
          this.loadEvents();
        })
        .catch(err => console.error(err));
    },
  },
};
// - ref={formRef}
</script>

<template>
  <AddButton
    :class-names="['event-form-icon']"
    :text="addButtonTexts.EVENT"
    :is-empty-string="true"
    @on-show-form-handler="onShowFormHandler"
  />
  <div v-if="!isHidden" class="form-wrapper-center">
    <form class="event-form form-error-message-width" @submit.prevent="onSubmitHandler">
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
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
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
