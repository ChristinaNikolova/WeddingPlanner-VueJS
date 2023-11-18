<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    isEditIconHidden: {
      type: Boolean,
      default: false,
    },
    // onHeightlightHandler,
    // onDeleteHandler,
    // onShowFormHandler,
  },
  emits: ['onDeleteHandler', 'onHeightlightHandler'],
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    getStyles() {
      return this.isHighlighted
        ? 'events-all-info-wrapper event-all-heightlight'
        : 'events-all-info-wrapper';
    },
  },
  methods: {
    onMouseEnterHandler() {
      this.isHovering = true;
    },
    onMouseLeaveHandler() {
      this.isHovering = false;
    },
  },
};
</script>

<template>
  <div class="events-all-main-wrapper">
    <div :class="getStyles" @mouseenter="onMouseEnterHandler" @mouseleave="onMouseLeaveHandler">
      <div class="events-all-info-left">
        <p class="events-all-time">
          {{ startTime }} - {{ endTime }}
        </p>
        <p class="events-all-duration">
          {{ duration }}
          <span class="events-all-duration-unit">minutes</span>
        </p>
      </div>
      <div class="events-all-info-right">
        <p class="events-all-title">
          {{ title }}
        </p>
        <span v-if="isHovering" class="events-all-icons">
          <!-- todo fix this -->
          <!-- <i v-if="!isEditIconHidden" onClick="{()" => onShowFormHandler(id)} class="fa-solid fa-pen"></i> -->
          <i v-if="!isEditIconHidden" class="fa-solid fa-pen" />
          <i v-if="!isEditIconHidden" class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
        </span>
      </div>
      <div class="events-all-star-icons-wrapper">
        <i v-if="isHighlighted" class="fa-solid fa-star" @click="$emit('onHeightlightHandler', id)" />
        <i v-else class="fa-regular fa-star" @click="$emit('onHeightlightHandler', id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events-all-main-wrapper {
  position: relative;
}

.events-all-main-wrapper::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 190px;
  background-color: var(--clr-gold);
  top: 0;
  bottom: 0;
  left: 46%;
}

.events-all-info-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  position: relative;
  padding: 10px 40px;
  margin: 0 auto 70px auto;
}

.events-all-info-wrapper::after {
  content: "";
  position: absolute;
  z-index: 1;
  width: 25px;
  height: 25px;
  left: 312px;
  top: 42px;
  background-color: var(--clr-white);
  border: 4px solid var(--clr-gold);
  border-radius: 50%;
}

.events-all-info-wrapper:hover {
  cursor: pointer;
  background-color: var(--clr-creme);
}

.events-all-info-wrapper .events-all-icons i {
  position: unset;
  margin-right: 8px;
}

.event-all-heightlight {
  background-color: var(--clr-creme);
}

.events-all-info-left {
  text-align: left;
  width: 400px;
}

.events-all-time {
  font-size: 34px;
  font-weight: 700;
}

.events-all-duration {
  font-size: 24px;
  font-weight: 600;
}

.events-all-duration-unit {
  font-size: 18px;
  margin-left: 5px;
}

.events-all-info-right {
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.events-all-title {
  font-size: 24px;
  text-transform: uppercase;
  word-break: normal;
  text-align: left;
}

.events-all-star-icons-wrapper i {
  position: absolute;
  top: 20px;
  right: 20px;
  color: var(--clr-gold);
}

@media screen and (max-width: 1900px) {
  .events-all-main-wrapper::after {
    left: 45.4%;
  }
}

@media screen and (max-width: 1800px) {
  .events-all-main-wrapper::after {
    left: 45.2%;
  }
}

@media screen and (max-width: 1700px) {
  .events-all-main-wrapper::after {
    left: 45%;
  }
}

@media screen and (max-width: 1600px) {
  .events-all-main-wrapper::after {
    left: 44.6%;
  }
}

@media screen and (max-width: 1500px) {
  .events-all-main-wrapper::after {
    left: 44.4%;
  }
}

@media screen and (max-width: 1400px) {
  .events-all-main-wrapper::after {
    left: 44.2%;
  }
}

@media screen and (max-width: 1300px) {
  .events-all-main-wrapper::after {
    left: 43.5%;
  }
}

@media screen and (max-width: 1200px) {
  .events-all-main-wrapper::after {
    left: 42.5%;
  }
}

@media screen and (max-width: 1100px) {
  .events-all-main-wrapper::after {
    left: 41.8%;
  }
}

@media screen and (max-width: 1000px) {
  .events-all-main-wrapper::after {
    left: 41.6%;
  }
}

@media screen and (max-width: 950px) {
  .events-all-main-wrapper::after {
    content: none;
  }

  .events-all-info-wrapper::after {
    content: none;
  }

  .events-all-info-wrapper {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30px;
    justify-content: space-between;
  }

  .events-all-info-left,
  .events-all-info-right {
    width: unset;
  }

  .events-all-time {
    font-size: 30px;
  }

  .events-all-duration {
    font-size: 20px;
  }

  .events-all-duration-unit {
    font-size: 16px;
  }

  .events-all-title {
    font-size: 20px;
  }
}

@media screen and (max-width: 650px) {
  .events-all-info-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
}
</style>
