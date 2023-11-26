<script>
import subtasksService from '../../../services/subtasks';
import { addButtonTexts } from '../../../utils/constants/global';
import SingleSubtask from './Single.vue';

export default {
  components: { SingleSubtask },
  props: {
    taskId: {
      type: String,
      required: true,
    },
    subtasks: {
      type: Array,
      default: () => ([]),
    },
    loadTasks: {
      type: Function,
    },
    // onCancelFormHandler
  },
  data() {
    return {
      subtaskId: '',
      addButtonTexts,
    };
  },
  methods: {
    // const onShowSubTaskFormHandler = (e) => {
    //     const targetFormElement = e.target.parentElement.parentElement.parentElement.children[1].children[0];
    //     targetFormElement.style.display = styleNames.FLEX;
    // }
    // const onCancelFormHelperHandler = () => {
    //     setSubtaskId('');
    // }
    onDoneSubtask(taskId, subtaskId) {
      subtasksService
        .done(taskId, subtaskId)
        .then(() => {
          this.loadTasks();
        })
        .catch(err => console.error(err));
    },
    onEditHandler(id) {
      this.subtaskId = id;
    },
    onDeleteHandler(taskId, subtaskId) {
      subtasksService
        .deleteById(taskId, subtaskId)
        .then(() => {
          this.loadTasks();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <div className="checklist-all-current-task-subtasks-wrapper">
    <h6 className="checklist-all-current-task-subtasks-title">
      Sub-tasks
    </h6>
    <div className="checklist-all-current-task-subtasks-form-wrapper">
      <!-- todo fix this -->
      <!-- {subtaskId
                    ? <UpdateSubtask
                        subtaskId={subtaskId}
                        loadTasks={loadTasks}
                        onCancelFormHelperHandler={onCancelFormHelperHandler}
                    />
                    : <CreateSubtask
                        taskId={taskId}
                        loadTasks={loadTasks}
                        onCancelFormHandler={onCancelFormHandler}
                    />
                } -->
    </div>
    <template v-if="subtasks.length">
      <SingleSubtask
        v-for="st in subtasks"
        :id="st.id"
        :key="st.id"
        :task-id="taskId"
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
        :is-empty-string="false"
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
