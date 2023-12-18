<script setup>
import { computed, ref } from 'vue';
import Single from './Single.vue';

const props = defineProps({
  comments: {
    type: Array,
    default: () => ([]),
  },
});

const index = ref(0);

const commentsLength = computed(() => {
  return props.comments?.length;
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
</script>

<template>
  <div class="comments-list-wrapper">
    <button class="btn" @click.prevent="prev">
      <i class="fa fa-angle-left" />
    </button>
    <div class="comments-list-carousel-wrapper">
      <Single
        v-for="(c, i) in (props.comments)"
        :key="c.id"
        :parent-index="index"
        :current-index="i"
        :comment="c"
      />
    </div>
    <button class="btn" @click.prevent="next">
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
