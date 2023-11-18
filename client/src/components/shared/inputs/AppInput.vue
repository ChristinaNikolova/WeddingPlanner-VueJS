<script>
export default {
  // todo add default values here and checke types
  // onChangeHandler, onBlurHandler
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
    },
    label: {
      type: String,
      required: true,
    },
    // checked: {
    //   type: String,
    //   required: true,
    // },
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
  <input
    :id="name"
    class="input"
    :name="name"
    :type="type"
    :value="modelValue"
    @input="onInput"
  >
</template>
