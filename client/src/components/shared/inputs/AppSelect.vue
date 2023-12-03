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
    errors: {
      type: Array,
      required: () => [],
    },
    categories: {
      type: Array,
      required: () => [],
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onChange($event) {
      const { value } = $event.target;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<template>
  <div class="form-wrapper">
    <label class="label" :for="name">{{ label }}</label>
    <select
      :id="name"
      class="input"
      :name="name"
      :value="modelValue"
      @change="onChange"
    >
      <option disabled value="">
        Please relect {{ name }}
      </option>
      <option v-for="c in categories" :key="c.id ? c.id : c" :value="c.id ? c.id : c">
        {{ c.name ? c.name : c }}
      </option>
    </select>
    <ClientError v-for="error of errors" :key="error.$uid" :error="error.$message" />
  </div>
</template>
