<script>
import eventsService from '../../services/events';
import SingleEvent from './Single.vue';

// todo emits or function
export default {
  components: { SingleEvent },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      eventId: '',
      events: [],
      isHidden: true,
      isEditIconHidden: false,
    };
  },
  async created() {
    // todo scrollToTop();
    await this.loadEvents();
  },
  methods: {
    async loadEvents() {
      await eventsService
        .all(this.plannerId)
        .then(res => this.events = res)
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
    onHeightlightHandler(id) {
      eventsService
        .heightlight(this.plannerId, id)
        .then(async () => {
          await this.loadEvents();
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<!-- const onShowFormHandler = (eventId) => {
  setIsHidden(!isHidden);
  eventId ? setEventId(eventId) : setEventId('');
  setIsEditIconHidden(!isEditIconHidden);
} -->

<!-- const onCancelFormHandler = () => {
  setIsHidden(true);
  setEventId('');
  setIsEditIconHidden(false);
} -->

<template>
  <section id="events-all" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        The big day
      </h2>
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
          @on-delete-handler="onDeleteHandler"
          @on-heightlight-handler="onHeightlightHandler"
        />
      </template>
      <!-- todo fix this -->
      <!-- :on-show-form-handler="onShowFormHandler" -->
      <p v-else class="empty empty-planner">
        No events yet
      </p>
    </div>
    <!-- todo fix this -->
    <!-- {eventId
                ? <UpdateEvent
                    eventId={eventId}
                    plannerId={plannerId}
                    onCancelFormHandler={onCancelFormHandler}
                    loadEvents={loadEvents}
                />
                : <CreateEvent
                    plannerId={plannerId}
                    isHidden={isHidden}
                    onCancelFormHandler={onCancelFormHandler}
                    onShowFormHandler={onShowFormHandler}
                    loadEvents={loadEvents}
                />
            } -->
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
