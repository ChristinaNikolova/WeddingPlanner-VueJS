<script>
import tasksService from '../../../services/tasks';
import { addButtonTexts, timespans } from '../../../utils/constants/global';
import AddButton from '../../shared/buttons/Add.vue';
import SingleTask from './Single.vue';

export default {
  components: { SingleTask, AddButton },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      taskId: '',
      tasks: [],
      currentIndex: '',
      timespan: '',
      timespans,
      addButtonTexts,
    };
  },
  async mounted() {
    this.loadTasks();
    // todo fix this
    this.$refs.tasksAllRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  methods: {
    isTask(time) {
      return this.tasks?.filter(t => t.timespan === time).length > 0;
    },
    async loadTasks() {
      await tasksService
        .all(this.plannerId)
        .then(res => this.tasks = res)
        .catch(err => console.error(err));
    },
    onDeleteHandler(id) {
      tasksService
        .deleteById(id)
        .then(async () => await this.loadTasks())
        .catch(err => console.error(err));
    },
    onEditHandler(id, index) {
      this.taskId = id;
      this.currentIndex = index;
    },
    // const onShowTaskFormHandler = (e) => {
    //     const targetFormElement = e.target.parentElement.parentElement.nextSibling;
    //     targetFormElement.style.display = styleNames.FLEX;

    //     const timeSpanValue = targetFormElement.previousSibling.children[0].innerText.toLowerCase();
    //     setTimespan(timeSpanValue);
    // }
    // const onCancelFormHandler = (e) => {
    //     cancelForm(e.target);
    //     setTaskId('');
    //     setCurrentIndex('');
    // }
  },
};
</script>

<template>
  <section id="checklist-all" ref="tasksAllRef" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        The big day
      </h2>
    </div>
    <div class="checklist-all-main-content-wrapper">
      <div v-for="(time, i) in timespans" :key="{ i }" class="checklist-all-timespan-wrapper">
        <div class="checklist-all-timespan-content-wrapper">
          <div class="checklist-all-timespan-title-wrapper">
            <p class="checklist-all-timespan">
              {{ time }}
            </p>
            <AddButton
              v-if="!taskId"
              :class-names="[]"
              :text="addButtonTexts.TASK"
              :is-empty-string="false"
              :on-show-form-handler="onShowTaskFormHandler"
            />
          </div>
          <!-- {taskId
          && index === currentIndex
          && <UpdateTask
            planner-id="{plannerId}"
            task-id="{taskId}"
            load-tasks="{loadTasks}"
            on-cancel-form-handler="{onCancelFormHandler}"
          />
          } -->
          <!-- {!taskId &&
          <CreateTask
            planner-id="{plannerId}"
            timespan="{timespan}"
            load-tasks="{loadTasks}"
            on-cancel-form-handler="{onCancelFormHandler}"
          />
          } -->
          <div class="checklist-all-line" />
          <div class="checklist-all-tasks-content-wrapper">
            <template v-if="isTask(time)">
              <template v-for="t in tasks" :key="t.id">
                <SingleTask
                  v-if="t.timespan === time"
                  :id="t.id"
                  :index="index"
                  :task-id="taskId"
                  :title="t.title"
                  :description="t.description"
                  :progress="t.progress"
                  :target="t.target"
                  :subtasks="t.subtasks"
                  :load-tasks="loadTasks"
                  @on-edit-handler="onEditHandler"
                  @on-delete-handler="onDeleteHandler"
                />
                <!-- todo fix this -->
                <!-- :on-cancel-form-handler="{onCancelFormHandler}" -->
              </template>
            </template>
            <p v-else class="checklist-all-empty-tasks">
              No tasks yet
            </p>
          </div>
        </div>
        <p class="checklist-all-end-content">
          ***
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.checklist-all-main-content-wrapper {
  padding-top: 40px;
  text-align: left;
  margin-left: 400px;
  margin-right: 400px;
}

.checklist-all-timespan-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checklist-all-timespan {
  font-size: 36px;
  text-transform: capitalize;
  font-weight: 700;
  margin-bottom: 20px;
}

.checklist-all-line {
  margin-bottom: 60px;
}

.checklist-all-empty-tasks {
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: var(--clr-gold);
  background-color: var(--clr-creme);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  padding: 12px 20px;
  margin-bottom: 20px;
}

.checklist-all-end-content {
  color: var(--clr-gold);
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

@media screen and (max-width: 1600px) {
  .checklist-all-main-content-wrapper {
    margin-left: 100px;
    margin-right: 100px;
  }
}

@media screen and (max-width: 1200px) {
  #checklist-all {
    margin-bottom: 120px;
  }
}

@media screen and (max-width: 1000px) {
  .checklist-all-main-content-wrapper {
    margin-left: 30px;
    margin-right: 30px;
  }
}

@media screen and (max-width: 500px) {
  .checklist-all-timespan {
    font-size: 30px;
  }
}
</style>