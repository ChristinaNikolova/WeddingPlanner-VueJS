<script setup>
const props = defineProps({
  budget: {
    type: String,
    default: '',
  },
  actualCosts: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="budget-info-wrapper">
    <p class="budget-info-target">
      <span class="budget-info-target-name">Budget:</span>
      <span class="budget-info-actual-unit">$</span>
      {{ props.budget }}
    </p>
    <p class="budget-info-actual">
      <span class="budget-info-actual-name">Actual total:</span>
      <span class="budget-info-actual-unit">$</span>
      {{ props.actualCosts }}
    </p>
  </div>
</template>

<style scoped>
.budget-info-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 50px;
  padding-left: 300px;
  padding-right: 300px;
  margin: 60px 0px;
}

.budget-info-actual-unit {
  margin-left: 15px;
  margin-right: 5px;
}

@media screen and (max-width: 1600px) {
  .budget-info-wrapper {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media screen and (max-width: 1200px) {
  .budget-info-wrapper {
    font-size: 40px;
  }
}

@media screen and (max-width: 1000px) {
  .budget-info-wrapper {
    padding-left: 50px;
    padding-right: 50px;
  }

  .budget-info-wrapper {
    font-size: 30px;
  }
}

@media screen and (max-width: 650px) {
  .budget-info-wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }

  .budget-info-wrapper {
    font-size: 26px;
  }
}

@media screen and (max-width: 550px) {
  .budget-info-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  .budget-info-wrapper {
    font-size: 30px;
  }
}
</style>
