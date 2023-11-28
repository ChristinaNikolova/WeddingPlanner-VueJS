<script>
export default {
  props: {
    isSearchIconClicked: {
      type: Boolean,
      default: false,
    },
    query: {
      type: String,
    },
  },
  emits: ['onSearchForm', 'onSearch'],
  data() {
    return {
      searchedQuery: this.query,
    };
  },
  methods: {
    onShowHandler() {
      this.searchedQuery = '';
      this.$emit('onSearchForm');
    },
  },
};
</script>

<template>
  <span class="articles-all-search-title">
    Search
    <template v-if="isSearchIconClicked">
      <AppInput
        v-model.trim="searchedQuery"
        name="search"
        type="text"
        label=""
      />
      <i
        class="fa-solid fa-magnifying-glass"
        @click="$emit('onSearch', $event, searchedQuery)"
      />
      <i class="fa-solid fa-xmark" @click="onShowHandler" />
    </template>
    <i
      v-else
      class="fa-solid fa-magnifying-glass glass-position"
      @click="$emit('onSearchForm')"
    />
  </span>
</template>

<style scoped>
.articles-all-search-title {
  position: relative;
}

.articles-all-search-title :deep(input) {
  border: 1px solid var(--clr-gold);
  width: 500px;
  margin-left: 10px;
}

.articles-all-search-title :deep(.form-wrapper) {
  display: unset;
}

.articles-all-search-title :deep(.form-wrapper:last-of-type) {
  margin-bottom: unset;
}

.articles-all-search-title i {
  font-size: 18px;
  margin-left: 10px;
}

.articles-all-search-title i:hover {
  color: var(--clr-gold);
}

.articles-all-search-title .fa-solid.fa-solid.fa-magnifying-glass.glass-position{
  position: absolute;
  top: 18px
}

@media screen and (max-width: 750px) {
  .articles-all-search-title input {
    width: 80%;
  }
}

@media screen and (max-width: 400px) {
  .articles-all-search-title input {
    width: 70%;
  }
}
</style>
