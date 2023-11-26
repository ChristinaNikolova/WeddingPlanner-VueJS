<script>
import notesService from '../../services/notes';
import form from '../../utils/helpers/form';
import Create from './Create.vue';
import SingleNote from './Single.vue';

export default {
  components: { SingleNote, Create },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      noteId: '',
      notes: [],
      isHidden: true,
      isEditIconHidden: false,
    };
  },
  async mounted() {
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
      // todo test if event can be removed
      this.isHidden = !this.isHidden;
      this.noteId = id || '';
      this.isEditIconHidden = !this.isEditIconHidden;
    },
    onCancelFormHandler() {
      form.onClearInputs();
      this.isHidden = true;
      this.noteId = '';
      this.isEditIconHidden = false;
    },
  },
};
</script>

<!-- // todo scrollToTop(); -->
<template>
  <section id="notes-all" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Notes
      </h2>
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
        />
      </template>
      <p v-else class="empty empty-planner">
        No notes yet
      </p>
    </div>
    <!-- {noteId
                ? <UpdateNote
                    noteId={noteId}
                    plannerId={plannerId}
                    onCancelFormHandler={onCancelFormHandler}
                    loadGuests={loadNotes}
                />
                : <CreateNote
                    plannerId={plannerId}
                    isHidden={isHidden}
                    onCancelFormHandler={onCancelFormHandler}
                    onShowFormHandler={onShowFormHandler}
                    loadNotes={loadNotes}
                />
            } -->
    <Create
      v-if="!noteId"
      :planner-id="plannerId"
      :is-hidden="isHidden"
      :load-notes="loadNotes"
      :on-cancel-form-handler="onCancelFormHandler"
      :on-show-form-handler="onShowFormHandler"
    />
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
