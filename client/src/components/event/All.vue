<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import eventsService from '../../services/events';
import { addButtonTexts } from '../../utils/constants/global';
import Create from './Create.vue';
import SingleEvent from './Single.vue';
import Update from './Update.vue';

const route = useRoute();
const plannerId = route.params.plannerId;
const allEvents = ref(null);
const eventId = ref('');
const events = ref([]);
const isHidden = ref(true);
const isEditIconHidden = ref(false);
const isLoading = ref(true);

onMounted(() => {
  loadEvents();
});

onUpdated(() => {
  if (eventId.value || !isHidden.value) {
    return;
  }
  allEvents.value.scrollIntoView({ behavior: 'instant', block: 'start' });
});

function loadEvents() {
  eventsService
    .all(plannerId)
    .then((res) => {
      events.value = res;
      isLoading.value = false;
    })
    .catch(err => console.error(err));
};

function onDeleteHandler(id) {
  eventsService
    .deleteById(id)
    .then(() => {
      loadEvents();
    })
    .catch(err => console.error(err));
};

function onHeightlightHandler(id) {
  eventsService
    .heightlight(plannerId, id)
    .then(() => {
      loadEvents();
    })
    .catch(err => console.error(err));
};

function onShowFormHandler(e, id) {
  isHidden.value = !isHidden.value;
  eventId.value = id || '';
  isEditIconHidden.value = !isEditIconHidden.value;
};

function onCancelFormHandler() {
  isHidden.value = true;
  eventId.value = '';
  isEditIconHidden.value = false;
};

function onFinish() {
  onCancelFormHandler();
  loadEvents();
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section
    v-else
    id="events-all"
    ref="allEvents"
    class="section-planner section-background"
  >
    <div class="section-title-wrapper">
      <h2 class="section-title">
        The big day
      </h2>
      <LinkButton button-text="Back" :path="`/plan/${plannerId}`" />
    </div>
    <div class="events-all-main-content-wrapper">
      <template v-if="events.length">
        <SingleEvent
          v-for="e in events"
          :id="e.id"
          :key="e.id"
          :title="e.title"
          :start-time="e.startTime"
          :end-time="e.endTime"
          :duration="e.duration"
          :is-highlighted="e.isHighlighted"
          :is-edit-icon-hidden="isEditIconHidden"
          @on-show-form-handler="onShowFormHandler"
          @on-delete-handler="onDeleteHandler"
          @on-heightlight-handler="onHeightlightHandler"
        />
      </template>
      <p v-else class="empty empty-planner">
        No events yet
      </p>
    </div>
    <Update
      v-if="eventId"
      :event-id="eventId"
      :planner-id="plannerId"
      @on-cancel-form-handler="onCancelFormHandler"
      @on-finish="onFinish"
    />
    <template v-else>
      <AddButton
        :class-names="['note-form-icon']"
        :text="addButtonTexts.NOTE"
        :is-empty-string="true"
        @on-show-form-handler="onShowFormHandler"
      />
      <Create
        :planner-id="plannerId"
        :is-hidden="isHidden"
        @on-cancel-form-handler="onCancelFormHandler"
        @on-finish="onFinish"
      />
    </template>
  </section>
</template>

<style scoped>
.events-all-main-content-wrapper {
  margin-bottom: 60px;
  padding-top: 40px;
  text-align: center;
}

@media screen and (max-width: 1900px) {
  #events-all {
    width: 90%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1200px) {
  #events-all {
    margin-bottom: 120px;
  }
}
</style>
