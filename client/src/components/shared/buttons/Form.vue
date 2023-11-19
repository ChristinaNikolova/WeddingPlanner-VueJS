<script>
export default {
  props: {
    formName: {
      type: String,
      required: true,
      default: 'Save',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onCancelFormHandler'],
};
</script>

<template>
  <div class="form-btns-wrapper">
    <button :disabled="isDisabled" class="btn btn-center">
      {{ formName }}
    </button>
    <button class="btn btn-center" type="button" @click="$emit('onCancelFormHandler')">
      Cancel
    </button>
  </div>
</template>
