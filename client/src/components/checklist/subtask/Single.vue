<script setup>
import { computed } from 'vue';
import { styleNames, tagNames } from '../../../utils/constants/global';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
    default: '',
  },
  subtaskId: {
    type: String,
    required: true,
    default: '',
  },
  id: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onDoneSubtask', 'onDeleteHandler', 'onEditHandler']);

const getStyles = computed(() => {
  return props.isDone
    ? 'checklist-all-current-task-current-subtask checklist-all-current-task-current-subtask-heightlight'
    : 'checklist-all-current-task-current-subtask';
});

function onMouseEnterHandler(e) {
  if (e.target.nodeName !== tagNames.P) {
    return;
  }
  e.target.children[0].style.display = styleNames.INLINE_BLOCK;
};

function onMouseLeaveHandler() {
  Array.from(document.getElementsByClassName('subtask-icons-wrapper')).forEach((el) => {
    el.style.display = styleNames.NONE;
  });
};
</script>

<template>
  <div :key="props.id" :class="getStyles">
    <i v-if="props.isDone" class="fa-solid fa-square-check" @click="emit('onDoneSubtask', props.taskId, props.id)" />
    <i v-else class="fa-solid fa-square" @click="emit('onDoneSubtask', props.taskId, props.id)" />
    <p
      class="checklist-all-current-task-current-subtask-description"
      @mouseenter="onMouseEnterHandler"
      @mouseleave="onMouseLeaveHandler"
    >
      {{ props.description }}
      <span
        class="checklist-all-current-task-current-subtask-icons-wrapper subtask-icons-wrapper"
        :style="{ display: `${styleNames.NONE}` }"
      >
        <i v-if="!props.subtaskId" class="fa-solid fa-pen" @click="emit('onEditHandler', props.id)" />
        <i class="fa-solid fa-trash" @click="emit('onDeleteHandler', props.taskId, props.id)" />
      </span>
    </p>
  </div>
</template>

<style scoped>
.checklist-all-current-task-current-subtask {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 10px 20px;
}

.checklist-all-current-task-current-subtask i {
  font-weight: 400;
  color: var(--clr-gold);
}

.checklist-all-current-task-current-subtask-heightlight {
  background-color: var(--clr-light-creme);
}

.checklist-all-current-task-current-subtask-heightlight
  .checklist-all-current-task-current-subtask-description {
  text-decoration: line-through;
}

.checklist-all-current-task-current-subtask-description {
  font-size: 22px;
  line-height: 1.6;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  color: var(--clr-grey);
}

.checklist-all-current-task-current-subtask-icons-wrapper {
  margin-left: 16px;
}

.checklist-all-current-task-current-subtask-icons-wrapper i {
  font-size: 16px;
  font-weight: 900;
}

.checklist-all-current-task-current-subtask-icons-wrapper i:first-of-type {
  margin-left: 12px;
  color: var(--clr-orange);
}

.checklist-all-current-task-current-subtask-icons-wrapper i:last-of-type {
  margin-left: 12px;
  color: var(--clr-red);
}

@media screen and (max-width: 600px) {
  .checklist-all-current-task-current-subtask {
    gap: 20px;
    padding-bottom: 20px;
  }

  .checklist-all-current-task-current-subtask-description {
    font-size: 18px;
  }
}
</style>
