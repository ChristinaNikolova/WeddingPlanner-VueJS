<script>
import { directions } from '../../utils/constants/global';

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pagesCount: {
      type: Number,
      default: 1,
    },
    selectedCategory:
     {
       type: Object,
       default: () => {},
     },
  },
  emits: ['onClickHandler'],
  data() {
    return {
      directions,
    };
  },
};
</script>

<template>
  <div class="pagination-wrapper">
    <router-link
      v-if="currentPage !== 1"
      class="pagination"
      :to="`/blog?page=${currentPage - 1}&category=${selectedCategory.name}`"
      @click="$emit('onClickHandler', directions.PREV)"
    >
      Newer posts
    </router-link>
    <router-link
      v-if="currentPage !== pagesCount"
      class="pagination"
      :to="`/blog?page=${currentPage + 1}&category=${selectedCategory.name}`"
      @click="$emit('onClickHandler', directions.NEXT)"
    >
      Older posts
    </router-link>
  </div>
</template>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.pagination {
  border: unset;
  background-color: unset;
  font-size: 24px;
  font-weight: 200;
  text-transform: uppercase;
  color: var(--clr-black);
}

.pagination:hover {
  cursor: pointer;
  font-weight: 600;
  color: var(--clr-gold);
  transition: all 500ms ease-in-out;
}

@media screen and (max-width: 1250px) {
  .pagination-wrapper {
    margin-bottom: 80px;
  }
}

@media screen and (max-width: 1150px) {
  .pagination-wrapper {
    margin-bottom: 100px;
  }
}

@media screen and (max-width: 650px) {
  .pagination-wrapper {
    margin-bottom: 120px;
  }

  .pagination {
    font-size: 20px;
  }
}

@media screen and (max-width: 450px) {
  .pagination {
    font-size: 18px;
  }
}
</style>
