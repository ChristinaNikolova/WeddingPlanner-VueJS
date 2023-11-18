<script>
// todo add default values here and checke types
// onChangeHandler, onBlurHandler
export default {
  props: {
    modelValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    rows: {
      type: String,
      required: true,
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
  <label class="label" :for="name">{{ label }}</label>
  <textarea
    :id="name"
    class="input"
    :name="name"
    :rows="rows"
    :value="modelValue"
    @input="onInput"
  />
</template>
