<script>
import guestsService from '../../services/guests';
import Create from './Create.vue';
import SingleGuest from './Single.vue';
import Update from './Update.vue';

export default {
  components: { SingleGuest, Update, Create },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      guestId: '',
      guests: [],
      isHidden: true,
      isEditIconHidden: false,
    };
  },
  async created() {
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
    onCancelFormHandler() {
      this.isHidden = true;
      this.isEditIconHidden = false;
      this.guestId = '';
    },
    onShowFormHandler(e, id) {
      this.isHidden = !this.isHidden;
      this.guestId = id || '';
      this.isEditIconHidden = !this.isEditIconHidden;
    },
  },
};
</script>

<template>
  <section id="guests-all" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Guests
      </h2>
    </div>
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
          @on-show-form-handler="onShowFormHandler"
          @on-delete-handler="onDeleteHandler"
        />
      </template>
    </div>
    <Update
      v-if="guestId"
      :guest-id="guestId"
      :planner-id="plannerId"
      :on-cancel-form-handler="onCancelFormHandler"
      :load-guests="loadGuests"
    />
    <Create
      v-else
      :planner-id="plannerId"
      :is-hidden="isHidden"
      :on-cancel-form-handler="onCancelFormHandler"
      :on-show-form-handler="onShowFormHandler"
      :load-guests="loadGuests"
    />
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
