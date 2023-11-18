<script>
import guestsService from '../../services/guests';
import SingleGuest from './Single.vue';

export default {
  components: { SingleGuest },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      guestId: '',
      guests: [],
      isHidden: true,
      isEditIconHidden: false,
    };
  },
  async mounted() {
    // toto scrollToTop();
    await this.loadGuests();
  },
  methods: {
    onDeleteHandler(guestId) {
      guestsService
        .deleteById(guestId)
        .then(async () => await this.loadGuests())
        .catch(err => console.error(err));
    },
    async loadGuests() {
      await guestsService
        .all(this.plannerId)
        .then(res => this.guests = res)
        .catch(err => console.error(err));
    },
  },
};
</script>
<!-- const onCancelFormHandler = () => {
    setIsHidden(true);
    setIsEditIconHidden(false);
    setGuestId('');
}

const onShowFormHandler = (guestId) => {
    setIsHidden(!isHidden);
    guestId ? setGuestId(guestId) : setGuestId('');
    setIsEditIconHidden(!isEditIconHidden);
} -->

<template>
  <section id="guests-all" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Guests
      </h2>
    </div>
    <!--  onShowFormHandler={onShowFormHandler} -->
    <div class="guests-all-main-content-wrapper">
      <template v-if="guests.length">
        <SingleGuest
          v-for="g in guests"
          :id="g.id"
          :key="g.id"
          :first-name="g.firstName"
          :last-name="g.lastName"
          :gender="g.gender"
          :age="g.age"
          :role="g.role"
          :side="g.side"
          :table="g.table"
          :main-dish="g.mainDish"
          :confirmed="g.confirmed"
          :is-edit-icon-hidden="isEditIconHidden"
          @on-delete-handler="onDeleteHandler"
        />
      </template>
    </div>
    <!-- todo update this -->
    <!-- {guestId
                ? <UpdateGuest
                    guestId={guestId}
                    plannerId={plannerId}
                    onCancelFormHandler={onCancelFormHandler}
                    loadGuests={loadGuests}
                />
                : <CreateGuest
                    plannerId={plannerId}
                    isHidden={isHidden}
                    onCancelFormHandler={onCancelFormHandler}
                    onShowFormHandler={onShowFormHandler}
                    loadGuests={loadGuests}
                />
            } -->
  </section>
</template>

<style scoped>
.guests-all-main-content-wrapper {
  padding-top: 40px;
}

@media screen and (max-width: 1200px) {
  #guests-all {
    margin-bottom: 120px;
  }
}
</style>
