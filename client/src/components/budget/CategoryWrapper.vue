<script>
import dropdown from '../../utils/helpers/dropdown';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'Category',
    },
    image: {
      type: String,
      required: true,
    },
    categoryCosts: {
      type: String,
      default: '',
    },
  },
  methods: {
    onShowContent(e) {
      const targetIcon = e.target;
      const targetElement = targetIcon.parentElement.parentElement.parentElement.nextSibling;
      dropdown.toggleWithTargetContent(targetElement, targetIcon);
    },
  },
};
</script>

<template>
  <div class="budget-main-current-category-info-wrapper">
    <div class="budget-main-current-category-info-left">
      <div class="budget-main-current-category-info">
        <i class="fa-solid fa-chevron-down" @click="onShowContent($event)" />
        <img class="budget-main-current-category-info-image img" :src="image" :alt="name">
        <span class="budget-main-current-category-info-name">
          {{ name }}
        </span>
      </div>
    </div>
    <div class="budget-main-current-category-info-right">
      <span class="budget-main-current-category-info-right-title">Actual category:</span>
      <span class="budget-main-current-category-info-right-unit">$</span>
      {{ categoryCosts }}
    </div>
  </div>
</template>

<style scoped>
.budget-main-current-category-info-wrapper {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding-right: 80px;
  margin-bottom: 12px;
}

.budget-main-current-category-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.budget-main-current-category-info-image {
  width: 40px;
  height: 40px;
}

.budget-main-current-category-info-name {
  font-size: 28px;
  font-weight: 700;
}

.budget-main-current-category-info-right {
  font-size: 28px;
  font-weight: 600;
}

.budget-main-current-category-info-right-unit {
  margin-left: 12px;
  margin-right: 2px;
}

@media screen and (max-width: 1000px) {
  .budget-main-current-category-info-wrapper {
    padding-right: 10px;
  }

  .budget-main-current-category-info-name,
  .budget-main-current-category-info-right {
    font-size: 24px;
  }
}

@media screen and (max-width: 700px) {
  .budget-main-current-category-info-wrapper {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 500px) {
  .budget-main-current-category-info-name,
  .budget-main-current-category-info-right {
    font-size: 20px;
  }

  .budget-main-current-category-info-image {
    width: 30px;
    height: 30px;
  }
}
</style>
