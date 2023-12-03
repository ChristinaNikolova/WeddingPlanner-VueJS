<script>
import eventsService from '../../services/events';
import { addButtonTexts } from '../../utils/constants/global';
import Create from './Create.vue';
import SingleEvent from './Single.vue';
import Update from './Update.vue';

export default {
  components: { SingleEvent, Update, Create },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      eventId: '',
      events: [],
      isHidden: true,
      isEditIconHidden: false,
      addButtonTexts,
      isLoading: true,
    };
  },
  async created() {
    await this.loadEvents();
  },
  methods: {
    async loadEvents() {
      await eventsService
        .all(this.plannerId)
        .then((res) => {
          this.events = res;
          this.isLoading = false;
        })
        .catch(err => console.error(err));
    },
    onDeleteHandler(id) {
      eventsService
        .deleteById(id)
        .then(async () => {
          await this.loadEvents();
        })
        .catch(err => console.error(err));
    },
    async onHeightlightHandler(id) {
      await eventsService
        .heightlight(this.plannerId, id)
        .then(async () => {
          await this.loadEvents();
        })
        .catch(err => console.error(err));
    },
    onShowFormHandler(e, id) {
      this.isHidden = !this.isHidden;
      this.eventId = id || '';
      this.isEditIconHidden = !this.isEditIconHidden;
    },
    onCancelFormHandler() {
      this.isHidden = true;
      this.eventId = '';
      this.isEditIconHidden = false;
    },
    async onFinish() {
      this.onCancelFormHandler();
      await this.loadEvents();
    },
  },
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section v-else id="events-all" class="section-planner section-background">
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
