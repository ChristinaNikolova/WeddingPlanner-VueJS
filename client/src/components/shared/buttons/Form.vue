<script setup>
const props = defineProps({
  formName: {
    type: String,
    required: true,
    default: 'Save',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onCancelButtonFormHandler']);
</script>

<template>
  <div class="form-btns-wrapper">
    <button :disabled="props.isDisabled" class="btn btn-center" type="submit">
      {{ props.formName }}
    </button>
    <button class="btn btn-center" type="button" @click="emit('onCancelButtonFormHandler', $event, true)">
      Cancel
    </button>
  </div>
</template>
