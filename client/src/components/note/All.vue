<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import notesService from '../../services/notes';
import { addButtonTexts } from '../../utils/constants/global';
import Create from './Create.vue';
import SingleNote from './Single.vue';
import Update from './Update.vue';

const route = useRoute();
const plannerId = route.params.plannerId;
const allNotes = ref(null);
const noteId = ref('');
const notes = ref([]);
const isHidden = ref(true);
const isEditIconHidden = ref(false);
const isLoading = ref(true);

onMounted(() => {
  loadNotes();
});

onUpdated(() => {
  if (noteId.value || !isHidden.value) {
    return;
  }
  allNotes.value.scrollIntoView({ behavior: 'instant', block: 'start' });
});

function loadNotes() {
  notesService
    .all(plannerId)
    .then((res) => {
      notes.value = res;
      isLoading.value = false;
    })
    .catch(err => console.error(err));
};

function onDeleteHandler(id) {
  notesService
    .deleteById(id)
    .then(() => {
      loadNotes();
    })
    .catch(err => console.error(err));
}

function onShowFormHandler(e, id) {
  isHidden.value = !isHidden.value;
  noteId.value = id || '';
  isEditIconHidden.value = !isEditIconHidden.value;
};

function onCancelFormHandler() {
  isHidden.value = true;
  noteId.value = '';
  isEditIconHidden.value = false;
};

function onFinish() {
  onCancelFormHandler();
  loadNotes();
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section
    v-else
    id="notes-all"
    ref="allNotes"
    class="section-planner section-background"
  >
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Notes
      </h2>
      <LinkButton button-text="Back" :path="`/plan/${plannerId}`" />
    </div>
    <div class="notes-all-main-content-wrapper">
      <template v-if="notes.length">
        <SingleNote
          v-for="n in notes"
          :id="n.id"
          :key="n.id"
          :description="n.description"
          :created-at="n.createdAt"
          :is-edit-icon-hidden="isEditIconHidden"
          @on-delete-handler="onDeleteHandler"
          @on-show-form-handler="onShowFormHandler"
        />
      </template>
      <p v-else class="empty empty-planner">
        No notes yet
      </p>
    </div>
    <Update
      v-if="noteId"
      :note-id="noteId"
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
.notes-all-main-content-wrapper {
  padding-top: 40px;
  text-align: center;
}

@media screen and (max-width: 1200px) {
  #notes-all {
    margin-bottom: 120px;
  }
}
</style>
