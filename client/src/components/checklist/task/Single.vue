<script>
import { styleNames, tagNames } from '../../../utils/constants/global';
import dropdown from '../../../utils/helpers/dropdown';
import AllSubtasks from '../subtask/All.vue';

export default {
  components: { AllSubtasks },
  props: {
    // todo check type here and why 2 ids
    index: {
      type: Number,
      required: true,
    },
    taskId: {
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    subtasks: {
      type: Array,
      default: () => ([]),
    },
    loadTasks: {
      type: Function,
    },
    onCancelFormHandler: {
      type: Function,
      required: true,
    },
  },
  emits: ['onDeleteHandler', 'onEditHandler', 'onCancelFormHandler'],
  data() {
    return {
      styleNames,
      tagNames,
    };
  },
  methods: {
    onMouseEnterHandler(e) {
      if (e.target.nodeName !== tagNames.H4) {
        return;
      }
      e.target.children[0].style.display = styleNames.INLINE_BLOCK;
    },
    onMouseLeaveHandler() {
      Array.from(document.getElementsByClassName('checklist-all-current-task-icons')).forEach((el) => {
        el.style.display = styleNames.NONE;
      });
    },
    onShowContent(e) {
      const targetIcon = e.target;
      const targetElement = targetIcon.parentElement.parentElement.parentElement.nextSibling;
      dropdown.toggleWithTargetContent(targetElement, targetIcon);
    },
  },
};
</script>

<template>
  <div :key="id" class="checklist-all-current-task-wrapper">
    <div class="checklist-all-current-task-header-wrapper">
      <h4
        class="checklist-all-current-task-header-title"
        @mouseenter="onMouseEnterHandler($event)"
        @mouseleave="onMouseLeaveHandler"
      >
        {{ title }}
        <span class="checklist-all-current-task-icons" :style="{ display: `${styleNames.NONE}` }">
          <i v-if="!taskId" class="fa-solid fa-pen" @click="$emit('onEditHandler', id, index)" />
          <i class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
        </span>
      </h4>
      <div class="checklist-all-current-task-header-content-wrapper">
        <div class="checklist-all-current-task-header-content-progress-wrapper">
          <span class="checklist-all-current-task-progress">{{ progress }}</span>
          <span class="checklist-all-current-task-delimiter">/</span>
          <span class="checklist-all-current-task-target">{{ target }}</span>
        </div>
        <div class="checklist-all-current-task-header-content-icon-wrapper">
          <i class="fa-solid fa-chevron-down" @click="onShowContent" />
        </div>
      </div>
    </div>
    <div class="checklist-all-current-task-info-wrapper" :style="{ display: `${styleNames.BLOCK}` }">
      <p class="checklist-all-current-task-info-desc">
        {{ description }}
      </p>
      <AllSubtasks
        :task-id="id"
        :subtasks="subtasks"
        :load-tasks="loadTasks"
        :on-cancel-form-handler="onCancelFormHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.checklist-all-current-task-wrapper {
  font-size: 26px;
  background-color: var(--clr-creme);
  padding: 12px 26px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  margin-bottom: 30px;
}

.checklist-all-current-task-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--clr-grey);
  margin-bottom: 15px;
}

.checklist-all-current-task-header-title {
  color: var(--clr-grey);
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: capitalize;
  display: flex;
  gap: 20px;
}

.checklist-all-current-task-header-title span i {
  font-size: 20px;
}

.checklist-all-current-task-header-title span i:first-of-type {
  margin-right: 8px;
}

.checklist-all-current-task-header-content-wrapper {
  display: flex;
  align-items: center;
  gap: 30px;
}

.checklist-all-current-task-header-content-progress-wrapper {
  font-weight: 900;
  color: var(--clr-black);
}

.checklist-all-current-task-delimiter {
  margin-left: 4px;
  margin-right: 4px;
}

.checklist-all-current-task-header-content-icon-wrapper {
  font-size: 16px;
  position: relative;
}

.checklist-all-current-task-header-content-icon-wrapper i {
  position: absolute;
  top: -5px;
  right: -3px;
}

.checklist-all-current-task-info-desc {
  font-size: 20px;
  font-weight: 700;
  text-transform: lowercase;
  line-height: 1.3;
  color: var(--clr-gold);
  margin-bottom: 40px;
}

@media screen and (max-width: 800px) {
  .checklist-all-current-task-header-title,
  .checklist-all-current-task-progress,
  .checklist-all-current-task-delimiter,
  .checklist-all-current-task-target {
    font-size: 24px;
  }

  .checklist-all-current-task-info-desc {
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  .checklist-all-current-task-header-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
