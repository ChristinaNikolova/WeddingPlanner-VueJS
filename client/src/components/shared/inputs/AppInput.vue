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
    },
    type: {
      type: String,
      required: true,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    errors: {
      type: Array,
      default: () => ([]),
    },
    isReadonly: {
      Type: Boolean,
      default: false,
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
    <input
      :id="name"
      class="input"
      :name="name"
      :type="type"
      :readonly="isReadonly"
      :value="modelValue"
      @input="onInput"
    >
    <ClientError v-for="error of errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
