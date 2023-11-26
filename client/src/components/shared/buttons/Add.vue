<script>
export default {
  props: {
    classNames: {
      type: Array,
      default: () => ([]),
    },
    text: {
      type: String,
    },
    isEmptyString: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onShowFormHandler'],
  computed: {
    getStyles() {
      return [...this.classNames, 'form-icon-wrapper'].join(' ');
    },
  },
};
</script>

<template>
  <div :class="getStyles">
    <!-- todo check and understand this -->
    <i v-if="isEmptyString" class="fa-solid fa-plus" @click="$emit('onShowFormHandler', $event, '')" />
    <i v-else class="fa-solid fa-plus" @click="$emit('onShowFormHandler', $event)" />
    Add {{ text }}
  </div>
</template>
