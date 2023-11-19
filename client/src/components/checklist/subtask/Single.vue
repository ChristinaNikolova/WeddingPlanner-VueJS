<script>
import { styleNames, tagNames } from '../../../utils/constants/global';

export default {
  props: {
    taskId: {
      type: String,
      required: true,
    },
    subtaskId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    // todo onEditHandler,
  },
  emits: ['onDoneSubtask', 'onDeleteHandler'],
  data() {
    return {
      styleNames,
      tagNames,
    };
  },
  computed: {
    getStyles() {
      return this.isDone
        ? 'checklist-all-current-task-current-subtask checklist-all-current-task-current-subtask-heightlight'
        : 'checklist-all-current-task-current-subtask';
    },
  },
  methods: {
    onMouseEnterHandler(e) {
      console.log('Subtask Single subtaskId', this.subtaskId);
      console.log('Subtask Single taskId', this.taskId);
      console.log('Subtask Single id', this.id);
      if (e.target.nodeName !== tagNames.P) {
        return;
      }

      e.target.children[0].style.display = styleNames.INLINE_BLOCK;
    },
    onMouseLeaveHandler() {
      Array.from(document.getElementsByClassName('subtask-icons-wrapper')).forEach((el) => {
        el.style.display = styleNames.NONE;
      });
    },
  },
};
</script>

<template>
  <div :key="id" :class="getStyles">
    <i v-if="isDone" class="fa-solid fa-square-check" @click="$emit('onDoneSubtask', taskId, id)" />
    <i v-else class="fa-solid fa-square" @click="$emit('onDoneSubtask', taskId, id)" />
    <p
      class="checklist-all-current-task-current-subtask-description"
      @mouseenter="onMouseEnterHandler"
      @mouseleave="onMouseLeaveHandler"
    >
      {{ description }}
      <span
        class="checklist-all-current-task-current-subtask-icons-wrapper subtask-icons-wrapper"
        :style="{ display: `${styleNames.NONE}` }"
      >
        <!-- todo fix this -->
        <!-- {!subtaskId && <i onClick={() => onEditHandler(id)} class="fa-solid fa-pen"></i>} -->
        <i class="fa-solid fa-trash" @click="$emit('onDeleteHandler', taskId, id)" />
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
