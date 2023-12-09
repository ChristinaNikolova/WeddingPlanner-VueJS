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
  label: {
    type: String,
    required: true,
    default: '',
  },
  rows: {
    type: String,
    required: true,
    default: '',
  },
  errors: {
    type: Array,
    default: () => [],
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
    <textarea
      :id="props.name"
      class="input"
      :name="props.name"
      :rows="props.rows"
      :value="props.modelValue"
      @input="onInput"
    />
    <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
