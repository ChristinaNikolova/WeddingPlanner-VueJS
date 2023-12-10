<script setup>
import { onMounted, ref } from 'vue';
import categoriesService from '../../../services/categories';
import Single from './Single.vue';

const categories = ref([]);
const serverError = ref([]);
const isLoading = ref(true);

onMounted(() => {
  loadCategories();
});

function onDeleteHandler(id) {
  categoriesService
    .deleteById(id)
    .then((res) => {
      if (res?.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      loadCategories();
    })
    .catch(err => console.error(err));
};

function loadCategories() {
  categoriesService
    .all()
    .then((res) => {
      categories.value = res;
      isLoading.value = false;
    })
    .catch(err => console.error(err));
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
