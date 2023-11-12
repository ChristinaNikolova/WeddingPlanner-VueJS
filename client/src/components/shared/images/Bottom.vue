<script>
export default {
  props: {
    first: {
      type: String,
      required: true,
    },
    second: {
      type: String,
      required: true,
    },
    third: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="bottom-img-wrapper">
    <img
      class="bottom-img img img-shadow"
      :src="'./../../../img/' + first"
      alt="wedding_flowers"
    />
    <img
      class="bottom-img img img-shadow"
      :src="'./../../../img/' + second"
      alt="wedding_table"
    />
    <img
      class="bottom-img img img-shadow"
      :src="'./../../../img/' + third"
      alt="wedding_invitations"
    />
  </div>
</template>

<style scoped>
.bottom-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 40px;
  margin-bottom: 40px;
}

.bottom-img {
  max-width: 30%;
  max-height: 20%;
}

@media screen and (max-width: 800px) {
  .bottom-img-wrapper {
    flex-direction: column;
    gap: 12px;
  }
}

@media screen and (max-width: 600px) {
  .bottom-img-wrapper {
    display: none;
  }
}
</style>
