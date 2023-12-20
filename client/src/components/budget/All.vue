<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import costsService from '../../services/costs';
import plannersService from '../../services/planners';
import categoriesService from '../../services/categories';
import { addButtonTexts, styleNames } from '../../utils/constants/global';
import form from '../../utils/helpers/form';
import CategoryWrapper from './CategoryWrapper.vue';
import InfoWrapper from './InfoWrapper.vue';
import SingleCost from './Single.vue';
import Create from './Create.vue';
import Update from './Update.vue';

const route = useRoute();
const plannerId = route.params.plannerId;
const costsAllRef = ref(null);
const budget = ref('');
const categories = ref([]);
const costs = ref([]);
const costId = ref('');
const currentIndex = ref(null);
const isLoading = ref(true);

onMounted(() => {
  loadCosts();
  plannersService
    .getBudget(plannerId)
    .then(res => budget.value = res)
    .catch(err => console.error(err));
  categoriesService
    .all()
    .then((res) => {
      categories.value = res;
    })
    .catch(err => console.error(err));
});

onUpdated(() => {
  if (costId.value) {
    return;
  }
  !isLoading.value && costsAllRef.value.scrollIntoView({ behavior: 'instant', block: 'start' });
});

const calculateActualCosts = computed(() => {
  return (costs.value
    .reduce((acc, curr) => Number(curr.price) + acc, 0))
    .toFixed(2);
});

function onCancelFormHandler(e) {
  form.cancelForm(e.target);
  costId.value = '';
  currentIndex.value = null;
};

function onShowFormHandler(e) {
  const targetFormElement = e.target.parentElement.parentElement.children[0];
  targetFormElement.style.display = styleNames.FLEX;
};

function onDeleteHandler(id) {
  costsService
    .deleteById(id)
    .then(() => loadCosts())
    .catch(err => console.error(err));
};

function onEditHandler(id, index) {
  costId.value = id;
  currentIndex.value = index;
};

function calculateCategoryActualCosts(categoryId) {
  return (costs.value
    .filter(c => c.category === categoryId)
    .reduce((acc, curr) => Number(curr.price) + acc, 0))
    .toFixed(2);
};

function isCost(currentCategoryId) {
  return costs.value.filter(cost => cost.category === currentCategoryId).length > 0;
};

function loadCosts(e) {
  costsService
    .all(plannerId)
    .then((res) => {
      costs.value = res;
      isLoading.value = false;
      e && onCancelFormHandler(e);
    })
    .catch(err => console.error(err));
};

function finish(e) {
  loadCosts(e);
};
</script>

<template>
  <Loading v-if="isLoading" />
  <section
    v-else
    id="budget"
    ref="costsAllRef"
    class="section-planner section-background"
  >
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Budget
      </h2>
      <LinkButton button-text="Back" :path="`/plan/${plannerId}`" />
    </div>
    <InfoWrapper
      :budget="budget"
      :actual-costs="calculateActualCosts"
    />
    <div class="budget-main-content-wrapper">
      <div v-for="(cat, index) in categories" :key="cat.id" class="budget-main-current-category-wrapper">
        <CategoryWrapper
          :name="cat.name"
          :image="cat.image"
          :category-costs="calculateCategoryActualCosts(cat.id)"
        />
        <div class="budget-main-current-category-costs-wrapper" :style="{ display: `${styleNames.BLOCK}` }">
          <Update
            v-if="costId && index === currentIndex"
            :planner-id="plannerId"
            :cost-id="costId"
            @on-cancel-form-handler="onCancelFormHandler"
            @finish="finish"
          />
          <Create
            v-if="!costId"
            :planner-id="plannerId"
            :category="cat.id"
            @on-cancel-form-handler="onCancelFormHandler"
            @finish="finish"
          />
          <div class="budget-main-current-category-costs-titles-wrapper">
            <p class="budget-main-current-category-costs-titles-title">
              Title
            </p>
            <p class="budget-main-current-category-costs-titles-cost">
              Actual cost
            </p>
          </div>
          <template v-if="isCost(cat.id)">
            <template v-for="cost in costs">
              <SingleCost
                v-if="cost.category === cat.id"
                :id="cost.id"
                :key="cost.id"
                :index="index"
                :cost-id="costId"
                :title="cost.title"
                :price="cost.price"
                @on-delete-handler="onDeleteHandler"
                @on-edit-handler="onEditHandler"
              />
            </template>
          </template>
          <p v-else class="budget-main-current-category-costs-empty">
            No costs yet
          </p>
          <AddButton
            v-if="!costId"
            :text="addButtonTexts.COST"
            @on-show-form-handler="onShowFormHandler"
          />
        </div>
      </div>
    </div>
    <InfoWrapper
      :budget="budget"
      :actual-costs="calculateActualCosts"
    />
  </section>
</template>

<style scoped>
.budget-main-content-wrapper {
  max-width: 1500px;
  margin: 0 auto;
  background-color: var(--clr-creme);
  border-radius: 8px;
  padding: 22px;
}

.budget-main-current-category-wrapper {
  margin-bottom: 50px;
}

.budget-main-content-wrapper
  .budget-main-current-category-wrapper:last-of-type {
  margin-bottom: 12px;
}

.budget-main-current-category-costs-wrapper {
  padding-left: 80px;
  padding-right: 80px;
}

.budget-main-current-category-costs-titles-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
}

.budget-main-current-category-costs-empty {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  color: var(--clr-gold);
  border-bottom: 1px solid var(--clr-gold);
  padding-bottom: 12px;
  margin-bottom: 20px;
}

@media screen and (max-width: 1600px) {
  .budget-main-content-wrapper {
    max-width: 80%;
  }
}

@media screen and (max-width: 1200px) {
  #budget {
    margin-bottom: 120px;
  }
}

@media screen and (max-width: 1000px) {
  .budget-main-content-wrapper {
    max-width: 95%;
  }

  .budget-main-current-category-costs-wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media screen and (max-width: 800px) {
  .budget-main-current-category-costs-wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media screen and (max-width: 700px) {
  .budget-main-current-category-costs-titles-cost,
  .budget-main-current-category-costs-titles-title {
    display: none;
  }
}
</style>
