<script>
import { styleNames, tagNames } from '../../utils/constants/global';

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    costId: {
      type: String,
      required: true,
      default: '',
    },
    id: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    price: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: ['onDeleteHandler', 'onEditHandler'],
  data() {
    return {
      styleNames,
      tagNames,
    };
  },
  methods: {
    onMouseEnterHandler(e) {
      if (e.target.nodeName !== tagNames.P) {
        return;
      }
      e.target.children[0].style.display = styleNames.INLINE_BLOCK;
    },
    onMouseLeaveHandler() {
      Array.from(document.getElementsByClassName('budget-main-current-category-current-cost-icons')).forEach((el) => {
        el.style.display = styleNames.NONE;
      });
    },
  },
};
</script>

<template>
  <div class="budget-main-current-category-current-cost-wrapper">
    <p
      class="budget-main-current-category-current-cost-title"
      @mouseenter="onMouseEnterHandler"
      @mouseleave="onMouseLeaveHandler"
    >
      {{ title }}
      <span class="budget-main-current-category-current-cost-icons" :style="{ display: `${styleNames.NONE}` }">
        <i v-if="!costId" class="fa-solid fa-pen" @click="$emit('onEditHandler', id, index)" />
        <i class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
      </span>
    </p>
    <p class="budget-main-current-category-current-cost-price">
      <span class="budget-main-current-category-current-cost-price-unit">$</span>
      {{ price }}
    </p>
  </div>
</template>

<style scoped>
.budget-main-current-category-current-cost-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 1px solid var(--clr-gold);
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.budget-main-current-category-current-cost-title i {
  font-size: 16px;
  margin-left: 16px;
}

.budget-main-current-category-current-cost-title i:last-of-type {
  margin-left: 8px;
}

.budget-main-current-category-current-cost-price-unit {
  margin-right: 4px;
}

@media screen and (max-width: 1000px) {
  .budget-main-current-category-current-cost-wrapper {
    font-size: 20px;
  }
}

@media screen and (max-width: 800px) {
  .budget-main-current-category-current-cost-wrapper {
    font-size: 18px;
  }
}

@media screen and (max-width: 700px) {
  .budget-main-current-category-current-cost-wrapper {
    flex-direction: column;
    align-items: flex-start;
    font-size: 22px;
  }
}
</style>
