<script>
export default {
  props: {
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
  },
  emits: ['update:modelValue'],
  methods: {
    onInput($event) {
      const { value } = $event.target;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<template>
  <div class="form-wrapper">
    <label class="label" :for="name">{{ label }}</label>
    <textarea
      :id="name"
      class="input"
      :name="name"
      :rows="rows"
      :value="modelValue"
      @input="onInput"
    />
    <ClientError v-for="error of errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
