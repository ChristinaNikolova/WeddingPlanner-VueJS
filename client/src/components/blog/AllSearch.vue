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
// onShowSearchForm, onSearch, onChangeHandler
};
</script>

<template>
  <span class="articles-all-search-title">
    Search
    <!-- {isSearchIconClicked
                ? <template v-if="isSearchIconClicked">
                    <Input
                        name="search"
                        type="text"
                        label=""
                        value={query}
                        onChangeHandler={onChangeHandler} />
                    <i onClick={onSearch} class="fa-solid fa-magnifying-glass"></i>
                    <i onClick={onShowSearchForm} class="fa-solid fa-xmark"></i>
                </template>
                : <i onClick={onShowSearchForm} class="fa-solid fa-magnifying-glass" style={{
                    position: "absolute",
                    top: "18px"
                }}></i>
            } -->
  </span>
</template>

<style scoped>
.articles-all-search-title {
  position: relative;
}

.articles-all-search-title input {
  border: 1px solid var(--clr-gold);
  width: 500px;
  margin-left: 10px;
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
