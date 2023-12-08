<script setup>
import { ref } from 'vue';

import subtasksService from '../../../services/subtasks';
import { addButtonTexts, styleNames } from '../../../utils/constants/global';
import Create from './Create.vue';
import SingleSubtask from './Single.vue';
import Update from './Update.vue';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
    default: '',
  },
  subtasks: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['onCancelFormHandler', 'onLoadTasks']);
const subtaskId = ref('');

function onShowSubTaskFormHandler(e) {
  const targetFormElement = e.target.parentElement.parentElement.parentElement.children[1].children[0];
  targetFormElement.style.display = styleNames.FLEX;
};

function onCancelFormHelperHandler() {
  subtaskId.value = '';
};

function onDoneSubtask(taskId, subtaskId) {
  subtasksService
    .done(taskId, subtaskId)
    .then(() => {
      emit('onLoadTasks');
    })
    .catch(err => console.error(err));
};

function onEditHandler(id) {
  subtaskId.value = id;
};

function onDeleteHandler(taskId, subtaskId) {
  subtasksService
    .deleteById(taskId, subtaskId)
    .then(() => {
      emit('onLoadTasks');
    })
    .catch(err => console.error(err));
};

function onFinish() {
  onCancelFormHelperHandler();
  emit('onLoadTasks');
};

function onCancel(e) {
  emit('onCancelFormHandler', e);
};
</script>

<template>
  <div className="checklist-all-current-task-subtasks-wrapper">
    <h6 className="checklist-all-current-task-subtasks-title">
      Sub-tasks
    </h6>
    <div className="checklist-all-current-task-subtasks-form-wrapper">
      <Update
        v-if="subtaskId"
        :subtask-id="subtaskId"
        @on-cancel-form-helper-handler="onCancelFormHelperHandler"
        @on-finish="onFinish"
      />
      <Create
        v-else
        :task-id="props.taskId"
        @on-cancel-form-handler="onCancel"
        @on-finish="onFinish"
      />
    </div>
    <template v-if="props.subtasks.length">
      <SingleSubtask
        v-for="st in props.subtasks"
        :id="st.id"
        :key="st.id"
        :task-id="props.taskId"
        :subtask-id="subtaskId"
        :description="st.description"
        :is-done="st.isDone"
        @on-done-subtask="onDoneSubtask"
        @on-delete-handler="onDeleteHandler"
        @on-edit-handler="onEditHandler"
      />
    </template>
    <p v-else className="checklist-all-empty-subtasks">
      No sub-tasks yet
    </p>
    <div className="checklist-all-current-task-subtasks-form-icon-wrapper">
      <AddButton
        v-if="!subtaskId"
        :class-names="[]"
        :text="addButtonTexts.SUB_TASK"
        @on-show-form-handler="onShowSubTaskFormHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.checklist-all-current-task-subtasks-wrapper {
  margin-top: 20px;
}

.checklist-all-current-task-subtasks-title {
  color: var(--clr-black);
  font-size: 22px;
  font-weight: 900;
  text-transform: capitalize;
  letter-spacing: -1px;
  padding-left: 90px;
  margin-bottom: 10px;
}

.checklist-all-current-task-subtasks-form-wrapper {
  margin-bottom: 20px;
}

.checklist-all-empty-subtasks {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: var(--clr-gold);
  padding-left: 20px;
  margin-bottom: 20px;
}

.checklist-all-current-task-subtasks-form-icon-wrapper {
  font-size: 18px;
  text-align: right;
  margin-top: 30px;
}

@media screen and (max-width: 800px) {
  .checklist-all-current-task-subtasks-title,
  .checklist-all-empty-subtasks {
    font-size: 20px;
  }
}
</style>
