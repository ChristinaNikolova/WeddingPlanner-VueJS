<script setup>
import { computed, ref } from 'vue';
import Single from './Single.vue';

const props = defineProps({
  initialComments: {
    type: Array,
    default: () => ([]),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onReduceComments']);
const index = ref(0);
const comments = ref(props.initialComments);

const commentsLength = computed(() => {
  return comments.value?.length;
});

function next() {
  index.value++;
  if (index.value >= commentsLength.value) {
    index.value = 0;
  }
};

function prev() {
  index.value--;
  if (index.value < 0) {
    index.value = commentsLength.value - 1;
  }
};

function onDeleteHandler(id) {
  comments.value = comments.value.filter(c => c.id !== id);
  if (comments.value.length === index.value) {
    index.value = 0;
  }
  emit('onReduceComments');
}
</script>

<template>
  <div class="comments-list-wrapper">
    <button :disabled="isDisabled" class="btn" @click.prevent="prev">
      <i class="fa fa-angle-left" />
    </button>
    <div class="comments-list-carousel-wrapper">
      <Single
        v-for="(c, i) in (comments)"
        :key="c.id"
        :parent-index="index"
        :current-index="i"
        :initial-comment="c"
        @on-delete="onDeleteHandler"
      />
    </div>
    <button :disabled="isDisabled" class="btn" @click.prevent="next">
      <i class="fa fa-angle-right" />
    </button>
  </div>
</template>

<style scoped>
.comments-list-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.comments-list-carousel-wrapper {
  margin: 0 auto;
  overflow: hidden;
  width: 1000px;
  min-height: 300px;
}
</style>
