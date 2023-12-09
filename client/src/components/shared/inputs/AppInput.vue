<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  type: {
    type: String,
    required: true,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
    default: '',
  },
  errors: {
    type: Array,
    default: () => [],
  },
  isReadonly: {
    Type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

function onInput($event) {
  const { value } = $event.target;
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="form-wrapper">
    <label class="label" :for="props.name">{{ props.label }}</label>
    <input
      :id="props.name"
      class="input"
      :name="props.name"
      :type="props.type"
      :readonly="props.isReadonly"
      :value="props.modelValue"
      @input="onInput"
    >
    <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
