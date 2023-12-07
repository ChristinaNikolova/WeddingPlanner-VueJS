<script setup>
import { computed } from 'vue';

const props = defineProps({
  classNames: {
    type: Array,
    default: () => [],
  },
  text: {
    type: String,
    default: '',
  },
  isEmptyString: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onShowFormHandler']);
const getStyles = computed(() => {
  return [...props.classNames, 'form-icon-wrapper'].join(' ');
});
</script>

<template>
  <div :class="getStyles">
    <i v-if="props.isEmptyString" class="fa-solid fa-plus" @click="emit('onShowFormHandler', $event, '')" />
    <i v-else class="fa-solid fa-plus" @click="emit('onShowFormHandler', $event)" />
    Add {{ props.text }}
  </div>
</template>
