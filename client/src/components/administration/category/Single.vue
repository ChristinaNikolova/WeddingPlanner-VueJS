<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  emits: ['onDeleteHandler'],
};
</script>

<!-- todo check this {id !== category.DEFAULT_CATEGORY_SELECTED_ID && <i class="fa-solid fa-trash" onClick={() => onDeleteHandler(id)}></i>} -->
<template>
  <li class="all-categories-li">
    <img :src="image" :alt="name" class="all-categories-img img">
    {{ name }}
    <router-link :to="`/administration/categories/edit/${id}`">
      <i class="fa-solid fa-pen" />
    </router-link>
    <i class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
  </li>
</template>

<style scoped>
.all-categories-li {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.8;
  margin-bottom: 20px;
}

.all-categories-li:hover {
  color: var(--clr-gold);
  font-weight: 800;
  font-size: 28px;
}

.all-categories-img {
  max-width: 60px;
  max-height: 60px;
  margin-left: 80px;
}

@media screen and (max-width: 600px) {
  .all-categories-li {
    font-size: 20px;
  }

  .all-categories-img {
    margin-left: 30px;
  }

  .all-categories-img {
    max-width: 40px;
  }
}

@media screen and (max-width: 400px) {
  .all-categories-li {
    font-size: 18px;
  }

  .all-categories-img {
    max-width: 30px;
  }
}
</style>
