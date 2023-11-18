<script>
import notesService from '../../services/notes';
import SingleNote from './Single.vue';

export default {
  components: { SingleNote },
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
    // todo scrollToTop();
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
  },
};
</script>

<!-- const onShowFormHandler = (noteId) => {
    setIsHidden(!isHidden);
    noteId ? setNoteId(noteId) : setNoteId('');
    setIsEditIconHidden(!isEditIconHidden);
}

const onCancelFormHandler = () => {
    setIsHidden(true);
    setNoteId('');
    setIsEditIconHidden(false);
} -->

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
    <!-- todo create forms -->
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
