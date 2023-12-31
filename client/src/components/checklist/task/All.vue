<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import tasksService from '../../../services/tasks';
import { addButtonTexts, styleNames, timespans } from '../../../utils/constants/global';
import form from '../../../utils/helpers/form';
import AllSubtasks from '../subtask/All.vue';
import Create from './Create.vue';
import SingleTask from './Single.vue';
import Update from './Update.vue';

const route = useRoute();
const plannerId = route.params.plannerId;
const tasksAllRef = ref(null);
const taskId = ref('');
const tasks = ref([]);
const currentIndex = ref('');

onMounted(() => {
  loadTasks();
});

onUpdated(() => {
  if (taskId.value) {
    return;
  }
  tasksAllRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function onDeleteHandler(id) {
  tasksService
    .deleteById(id)
    .then(() => loadTasks())
    .catch(err => console.error(err));
};

function onEditHandler(id, index) {
  taskId.value = id;
  currentIndex.value = index;
};

function onShowTaskFormHandler(e) {
  const targetFormElement = e.target.parentElement.parentElement.nextSibling;
  targetFormElement.style.display = styleNames.FLEX;
};

function onCancelFormHandler(e) {
  form.cancelForm(e.target);
  taskId.value = '';
  currentIndex.value = '';
};

function finish(e) {
  loadTasks();
  onCancelFormHandler(e);
};

function isTask(time) {
  return tasks?.value.filter(t => t.timespan === time).length > 0;
};

function loadTasks() {
  tasksService
    .all(plannerId)
    .then(res => tasks.value = res)
    .catch(err => console.error(err));
};
</script>

<template>
  <section id="checklist-all" ref="tasksAllRef" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        The big day
      </h2>
      <LinkButton button-text="Back" :path="`/plan/${plannerId}`" />
    </div>
    <div class="checklist-all-main-content-wrapper">
      <div v-for="(time, index) in timespans" :key="{ index }" class="checklist-all-timespan-wrapper">
        <div class="checklist-all-timespan-content-wrapper">
          <div class="checklist-all-timespan-title-wrapper">
            <p class="checklist-all-timespan">
              {{ time }}
            </p>
            <AddButton
              v-if="!taskId"
              :class-names="[]"
              :text="addButtonTexts.TASK"
              @on-show-form-handler="onShowTaskFormHandler"
            />
          </div>
          <Update
            v-if="taskId && index === currentIndex"
            :planner-id="plannerId"
            :task-id="taskId"
            @on-cancel-form-handler="onCancelFormHandler"
            @finish="finish"
          />
          <Create
            v-else-if="!taskId"
            :planner-id="plannerId"
            @on-cancel-form-handler="onCancelFormHandler"
            @finish="finish"
          />
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
                  @on-edit-handler="onEditHandler"
                  @on-delete-handler="onDeleteHandler"
                >
                  <template #allSubTasks>
                    <AllSubtasks
                      :task-id="t.id"
                      :subtasks="t.subtasks"
                      @on-cancel-form-handler="onCancelFormHandler"
                      @load-tasks="loadTasks"
                    />
                  </template>
                </SingleTask>
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
