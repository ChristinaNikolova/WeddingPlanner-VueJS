<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { formNames, styleNames } from '../../../utils/constants/global';
import tasksService from '../../../services/tasks';
import { global } from '../../../utils/constants/error';
import { task as taskModels } from '../../../utils/constants/model';

export default {
  props: {
    plannerId: {
      type: String,
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
    loadTasks: {
      type: Function,
      required: true,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onCancelFormHandler'],
  setup() {
    return { v$: useVuelidate(),
    };
  },
  data() {
    return {
      data: {
        title: '',
        description: '',
      },
      formName: formNames.UPDATE,
      serverError: '',
      isDisabled: true,
      currentStyle: styleNames.NONE,
      models: taskModels,
      global,
    };
  },
  watch: {
    data: {
      handler() {
        this.currentStyle = styleNames.FLEX;
        this.isDisabled = this.v$.data.title.$invalid || this.v$.data.description.$invalid;
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
        description: {
          required: helpers.withMessage(global.REQUIRED, required),
          minLength: helpers.withMessage(global.DESC(this.models.DESC_MIN_LEN, this.models.DESC_MAX_LEN), minLength(this.models.DESC_MIN_LEN)),
          maxLength: helpers.withMessage(global.DESC(this.models.DESC_MIN_LEN, this.models.DESC_MAX_LEN), maxLength(this.models.DESC_MAX_LEN)),
        },
      },
    };
  },
  async created() {
    await tasksService
      .getById(this.planner, this.taskId)
      .then((res) => {
        this.data.title = res.title;
        this.data.description = res.description;
      })
      .catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(e) {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        return;
      }

      tasksService
        .update(this.taskId, this.data.title, this.data.description)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.serverError = '';
          this.currentStyle = styleNames.NONE;
          this.onCancelFormHandler(e);
          this.loadTasks();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <div class="form-wrapper-center" :style="{ display: `${currentStyle}` }">
    <form class="form-width form-error-message-width" @submit.prevent="onSubmitHandler">
      <ServerError v-if="serverError" :errors="serverError" />
      <AppInput
        v-model.trim="v$.data.title.$model"
        :errors="v$?.data.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppTextArea
        v-model.trim="v$.data.description.$model"
        :errors="v$?.data.description.$errors"
        name="description"
        rows="4"
        label="Description"
      />
      <FormButton
        :form-name="formName"
        :is-disabled="isDisabled"
        @on-cancel-button-form-handler="onCancelFormHandler"
      />
    </form>
  </div>
</template>
