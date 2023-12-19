<script setup>
import { computed, onUpdated, ref, watch } from 'vue';
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
const emit = defineEmits(['onLoadComments', 'onShowFormHandler']);
const index = ref(0);
const comments = ref(props.initialComments);

const commentsLength = computed(() => {
  return comments.value?.length;
});

onUpdated(() => {
  comments.value = props.initialComments;
});

watch(comments, (newValue, oldValue) => {
  if (newValue.length > oldValue.length) {
    index.value = 0;
  }
  if (newValue.length < oldValue.length) {
    index.value = index.value - 1 < 0 ? 0 : index.value - 1;
  }
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

function onDeleteHandler() {
  emit('onLoadComments');
}

function onShow(event, id) {
  emit('onShowFormHandler', event, id);
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
        @on-show="onShow"
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
