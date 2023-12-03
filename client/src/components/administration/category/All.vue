<script>
import categoriesService from '../../../services/categories';
import Single from './Single.vue';

export default {
  components: { Single },
  data() {
    return {
      categories: [],
      serverError: [],
      isLoading: true,
    };
  },
  async created() {
    await this.loadCategories();
  },
  methods: {
    async onDeleteHandler(id) {
      categoriesService
        .deleteById(id)
        .then(async (res) => {
          if (res?.message) {
            this.serverError = res.message;
            return;
          }

          this.serverError = [];
          await this.loadCategories();
        })
        .catch(err => console.error(err));
    },
    async loadCategories() {
      await categoriesService
        .all()
        .then((res) => {
          this.categories = res;
          this.isLoading = false;
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section v-else class="section-background">
    <ServerError v-if="serverError.length" :errors="serverError" />
    <div class="section-title-wrapper">
      <h2 class="section-title">
        All Category
      </h2>
      <LinkButton button-text="Back" path="/administration" />
    </div>
    <div>
      <ul class="all-categories-ul">
        <Single
          v-for="c in categories"
          :id="c.id"
          :key="c.id"
          :name="c.name"
          :image="c.image"
          @on-delete-handler="onDeleteHandler"
        />
      </ul>
    </div>
  </section>
</template>

<style scoped>
.all-categories-ul {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  padding-bottom: 40px;
}

@media screen and (max-width: 1200px) {
  .all-categories-ul {
    margin-bottom: 80px;
  }
}
</style>
