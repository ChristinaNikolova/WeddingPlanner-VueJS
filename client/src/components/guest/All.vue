<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import guestsService from '../../services/guests';
import { addButtonTexts } from '../../utils/constants/global';
import Create from './Create.vue';
import SingleGuest from './Single.vue';
import Update from './Update.vue';

const route = useRoute();
const plannerId = route.params.plannerId;
const allGuests = ref(null);
const guestId = ref('');
const guests = ref([]);
const isHidden = ref(true);
const isEditIconHidden = ref(false);
const isLoading = ref(true);

onMounted(() => {
  loadGuests();
});

onUpdated(() => {
  if (guestId.value || !isHidden.value) {
    return;
  }
  allGuests.value.scrollIntoView({ behavior: 'instant', block: 'start' });
});

function onDeleteHandler(guestId) {
  guestsService
    .deleteById(guestId)
    .then(() => loadGuests())
    .catch(err => console.error(err));
};

function onCancelFormHandler() {
  isHidden.value = true;
  isEditIconHidden.value = false;
  guestId.value = '';
};

function onShowFormHandler(e, id) {
  isHidden.value = !isHidden.value;
  guestId.value = id || '';
  isEditIconHidden.value = !isEditIconHidden.value;
};

function finish() {
  onCancelFormHandler();
  loadGuests();
};

function loadGuests() {
  guestsService
    .all(plannerId)
    .then((res) => {
      guests.value = res;
      isLoading.value = false;
    })
    .catch(err => console.error(err));
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section
    v-else
    id="guests-all"
    ref="allGuests"
    class="section-planner section-background"
  >
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Guests
      </h2>
      <LinkButton button-text="Back" :path="`/plan/${plannerId}`" />
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
      @on-cancel-form-handler="onCancelFormHandler"
      @finish="finish"
    />
    <template v-else>
      <AddButton
        :class-names="['guest-form-icon']"
        :text="addButtonTexts.GUEST"
        :is-empty-string="true"
        @on-show-form-handler="onShowFormHandler"
      />
      <Create
        :planner-id="plannerId"
        :is-hidden="isHidden"
        @on-cancel-form-handler="onCancelFormHandler"
        @finish="finish"
      />
    </template>
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
