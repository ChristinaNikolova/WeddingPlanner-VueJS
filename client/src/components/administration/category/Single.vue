<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: '',
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    default: '',
  },
});
const emit = defineEmits(['onDeleteHandler']);
</script>

<template>
  <li class="all-categories-li">
    <img :src="props.image" :alt="props.name" class="all-categories-img img">
    {{ props.name }}
    <router-link :to="`/administration/categories/edit/${props.id}`">
      <i class="fa-solid fa-pen" />
    </router-link>
    <i class="fa-solid fa-trash" @click="emit('onDeleteHandler', props.id)" />
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
