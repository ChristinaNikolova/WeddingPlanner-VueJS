<script>
import notesService from '../../services/notes';
import { addButtonTexts } from '../../utils/constants/global';
import Create from './Create.vue';
import SingleNote from './Single.vue';
import Update from './Update.vue';

export default {
  components: { SingleNote, Create, Update },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      noteId: '',
      notes: [],
      isHidden: true,
      isEditIconHidden: false,
      addButtonTexts,
    };
  },
  async created() {
    await this.loadNotes();
  },
  methods: {
    async loadNotes() {
      await notesService
        .all(this.plannerId)
        .then(res => this.notes = res)
        .catch(err => console.error(err));
    },
    onDeleteHandler(id) {
      notesService
        .deleteById(id)
        .then(async () => {
          await this.loadNotes();
        })
        .catch(err => console.error(err));
    },
    onShowFormHandler(e, id) {
      this.isHidden = !this.isHidden;
      this.noteId = id || '';
      this.isEditIconHidden = !this.isEditIconHidden;
    },
    onCancelFormHandler() {
      this.isHidden = true;
      this.noteId = '';
      this.isEditIconHidden = false;
    },
    async onFinish() {
      this.onCancelFormHandler();
      await this.loadNotes();
    },
  },
};
</script>

<template>
  <section id="notes-all" class="section-planner section-background">
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
      :on-cancel-form-handler="onCancelFormHandler"
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
