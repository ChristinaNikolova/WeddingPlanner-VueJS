<script setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import Single from './Single.vue';

const props = defineProps({
  initialComments: {
    type: Array,
    default: () => ([]),
  },
  initialIndex: {
    type: Number,
    default: null,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['loadComments', 'onShowFormHandler', 'clearIndex']);
const index = ref(0);
const comments = ref(props.initialComments);

const commentsLength = computed(() => {
  return comments.value?.length;
});

onMounted(() => {
  if (props.initialIndex) {
    index.value = props.initialIndex;
  }
});

onUpdated(() => {
  comments.value = props.initialComments;
});

watch(comments, (newValue, oldValue) => {
  if (newValue.length < oldValue.length) {
    index.value = index.value - 1 < 0 ? 0 : index.value - 1;
  }
});

function onNextHandler() {
  index.value++;
  if (index.value >= commentsLength.value) {
    index.value = 0;
  }
  emit('clearIndex');
};

function onPrevHandler() {
  index.value--;
  if (index.value < 0) {
    index.value = commentsLength.value - 1;
  }
  emit('clearIndex');
};

function onDeleteHandler() {
  emit('loadComments');
}

function onShowForm(event, id) {
  const indexToSend = id ? index.value : null;
  emit('onShowFormHandler', event, id, indexToSend);
}
</script>

<template>
  <div class="comments-list-wrapper">
    <button :disabled="isDisabled" class="btn" @click.prevent="onPrevHandler">
      <i class="fa fa-angle-left" />
    </button>
    <div class="comments-list-carousel-wrapper">
      <Single
        v-for="(c, i) in (comments)"
        :key="c.id"
        :parent-index="index"
        :current-index="i"
        :initial-comment="c"
        @on-show="onShowForm"
        @on-delete="onDeleteHandler"
      />
    </div>
    <button :disabled="isDisabled" class="btn" @click.prevent="onNextHandler">
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

@media screen and (max-width: 1500px) {
  .comments-list-wrapper {
    gap: 100px;
  }
}

@media screen and (max-width: 1200px) {
  .comments-list-wrapper {
    gap: 80px;
  }
}

@media screen and (max-width: 900px) {
  .comments-list-wrapper {
    gap: 60px;
  }

  .comments-list-wrapper .btn {
    padding: 8px 26px;
  }
}

@media screen and (max-width: 600px) {
  .comments-list-wrapper {
    gap: 30px;
  }
  .comments-list-wrapper .btn {
    padding: 6px 22px;
  }
}
</style>
