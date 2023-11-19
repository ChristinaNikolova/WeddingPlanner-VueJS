<script>
import costsService from '../../services/costs';
import plannersService from '../../services/planners';
import categoriesService from '../../services/categories';
import { addButtonTexts, styleNames } from '../../utils/constants/global';
import { category } from '../../utils/constants/model';
import AddButton from '../shared/buttons/Add.vue';
import CategoryWrapper from './CategoryWrapper.vue';
import InfoWrapper from './InfoWrapper.vue';
import SingleCost from './Single.vue';

export default {
  components: { CategoryWrapper, InfoWrapper, AddButton, SingleCost },
  data() {
    return {
      plannerId: this.$route.params.plannerId,
      budget: 0,
      categories: [],
      costs: [],
      costId: '',
      currentIndex: '',
      styleNames,
      addButtonTexts,
      defaultCategory: category.DEFAULT_CATEGORY_SELECTED_ID,
    };
  },
  computed: {
    calculateActualCosts() {
      // todo extract as normal method????
      return (this.costs
        .reduce((acc, curr) => Number(curr.price) + acc, 0))
        .toFixed(2);
    },
  },
  async mounted() {
    await this.loadCosts();

    await plannersService
      .getBudget(this.plannerId)
      .then(res => this.budget = res)
      .catch(err => console.error(err));

    await categoriesService
      .all()
      .then((res) => {
        res = res.filter(el => el.id !== this.defaultCategory);
        this.categories = res;
        // costsAllRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(err => console.error(err));
  },
  methods: {
    // const onCancelFormHandler = (e) => {
    //     cancelForm(e.target);
    //     setCostId('');
    //     setCurrentIndex('');
    // }
    // const onShowFormHandler = (e) => {
    //     const targetFormElement = e.target.parentElement.parentElement.children[0];
    //     targetFormElement.style.display = styleNames.FLEX;
    // }
    async loadCosts() {
      await costsService
        .all(this.plannerId)
        .then(res => this.costs = res)
        .catch(err => console.error(err));
    },
    onDeleteHandler(id) {
      costsService
        .deleteById(id)
        .then(async () => await this.loadCosts())
        .catch(err => console.error(err));
    },
    // const onEditHandler = (id, index) => {
    //     setCostId(id);
    //     setCurrentIndex(index);
    // }
    calculateCategeryActualCosts(categoryId) {
      return (this.costs
        .filter(c => c.category === categoryId)
        .reduce((acc, curr) => Number(curr.price) + acc, 0))
        .toFixed(2);
    },
    isCost(currentCategoryId) {
      return this.costs.filter(cost => cost.category === currentCategoryId).length > 0;
    },
  },
};
</script>

<!-- const costsAllRef = useRef(null); -->
<template>
  <!-- ref={costsAllRef} -->
  <section id="budget" class="section-planner section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Budget
      </h2>
    </div>
    <!-- todo test the two props here -->
    <InfoWrapper
      :budget="budget"
      :actual-costs="calculateActualCosts"
    />
    <div class="budget-main-content-wrapper">
      <div v-for="(cat, index) in categories" :key="cat.id" class="budget-main-current-category-wrapper">
        <CategoryWrapper

          :name="cat.name"
          :image="cat.image"
          :category-costs="calculateCategeryActualCosts(cat.id)"
        />
        <div class="budget-main-current-category-costs-wrapper" :style="{ display: `${styleNames.BLOCK}` }">
          <!-- {costId
                                && index === currentIndex
                                && <UpdateCost
                                    plannerId={plannerId}
                                    costId={costId}
                                    loadCosts={loadCosts}
                                    onCancelFormHandler={onCancelFormHandler}
                                />
                            } -->
          <!-- {!costId &&
                                <CreateCost
                                    plannerId={plannerId}
                                    category={c.id}
                                    loadCosts={loadCosts}
                                    onCancelFormHandler={onCancelFormHandler}
                                />
                            } -->
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
              />
              <!-- onEditHandler={onEditHandler} -->
            </template>
          </template>
          <p v-else class="budget-main-current-category-costs-empty">
            No costs yet
          </p>
          <AddButton
            v-if="!costId"
            :class-names="[]"
            :text="addButtonTexts.COST"
            :is-empty-string="false"
          />
          <!-- on-show-form-handler="onShowFormHandler" -->
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
