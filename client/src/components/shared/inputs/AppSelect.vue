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
  errors: {
    type: Array,
    required: () => [],
  },
  categories: {
    type: Array,
    required: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);

function onChange($event) {
  const { value } = $event.target;
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="form-wrapper">
    <label class="label" :for="props.name">{{ props.label }}</label>
    <select
      :id="props.name"
      class="input"
      :name="props.name"
      :value="props.modelValue"
      @change="onChange"
    >
      <option disabled value="">
        Please relect {{ props.name }}
      </option>
      <option v-for="c in props.categories" :key="c.id ? c.id : c" :value="c.id ? c.id : c">
        {{ c.name ? c.name : c }}
      </option>
    </select>
    <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
