<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    createdAt: {
      type: String,
      required: true,
    },
    isEditIconHidden: {
      type: Boolean,
      required: true,
      default: false,
    },
    // todo onShowFormHandler
  },
  emits: ['onDeleteHandler'],
};
</script>

<template>
  <div class="notes-all-info-wrapper">
    <div class="notes-all-info-left">
      <p class="notes-all-info">
        {{ createdAt }}
      </p>
      <div class="notes-all-icon-wrapper">
        <!-- todo TEST THIs -->
        <!-- <i v-if="!isEditIconHidden" onClick="{()" => onShowFormHandler(id)} class="fa-solid fa-pen"></i>} -->
        <i v-if="!isEditIconHidden" class="fa-solid fa-pen" />
        <i v-if="!isEditIconHidden" class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
      </div>
    </div>
    <div class="notes-all-info-right">
      <p class="notes-all-description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.notes-all-info-wrapper {
  display: flex;
  justify-content: left;
  align-items: flex-start;
  gap: 100px;
  padding-bottom: 15px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 35px;
  border-bottom: 1px solid var(--clr-gold);
}

.notes-all-info-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
}

.notes-all-info {
  font-size: 20px;
  font-weight: 700;
}

.notes-all-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.notes-all-description {
  font-size: 22px;
  line-height: 1.5;
  text-align: left;
}

@media screen and (max-width: 1300px) {
  .notes-all-info-wrapper {
    margin-left: 70px;
    margin-right: 70px;
  }
}

@media screen and (max-width: 1000px) {
  .notes-all-info-wrapper {
    gap: 50px;
  }
}

@media screen and (max-width: 600px) {
  .notes-all-info-wrapper {
    flex-direction: column;
    gap: 30px;
  }

  .notes-all-info-left {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
