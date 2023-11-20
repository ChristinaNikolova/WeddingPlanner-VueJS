<script>
import { dishImages, personImages } from '../../utils/constants/image';
import { dishes, genders, people } from '../../utils/constants/global';

export default {
  // todo names on function => same convension
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    side: {
      type: String,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    mainDish: {
      type: String,
      required: true,
      default: 'no info',
    },
    confirmed: {
      type: Boolean,
      required: false,
    },
    isEditIconHidden: {
      type: Boolean,
      required: false,
    },
    // onShowFormHandler,
  },
  emits: ['onDeleteHandler'],
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    getDishImage() {
      let image = '';

      if (this.mainDish === dishes.MEAT) {
        image = dishImages.MEAT;
      }
      else if (this.mainDish === dishes.FISH) {
        image = dishImages.FISH;
      }
      else if (this.mainDish === dishes.VEGGIES) {
        image = dishImages.VEGGIES;
      }

      return image;
    },
    getPersonImage() {
      let image = '';

      if (this.age === people.ADULT && this.gender === genders.MALE) {
        image = personImages.ADULT_MALE;
      }
      else if (this.age === people.ADULT && this.gender === genders.FEMALE) {
        image = personImages.ADULT_FEMALE;
      }
      else if (this.age === people.CHILD && this.gender === genders.MALE) {
        image = personImages.CHILD_MALE;
      }
      else if (this.age === people.CHILD && this.gender === genders.FEMALE) {
        image = personImages.CHILD_FEMALE;
      }
      else if (this.age === people.BABY) {
        image = personImages.BABY;
      }

      return image;
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
  <div class="guests-all-info-wrapper">
    <div class="guests-all-info-left">
      <p class="guests-all-role">
        {{ role }}
      </p>
      <p class="guests-all-name" @mouseenter="onMouseEnterHandler" @mouseleave="onMouseLeaveHandler">
        {{ firstName }} {{ lastName }}
        <span class="guests-all-image">
          <i :class="getPersonImage" />
        </span>
        <!-- todo TEST THIs -->
        <span v-if="isHovering" class="guests-all-icons">
          <!-- {!isEditIconHidden && <i onClick="{()" => onShowFormHandler(id)} class="fa-solid fa-pen"></i>} -->
          <i v-if="!isEditIconHidden" class="fa-solid fa-pen" />
          <!-- {role !== 'bride' && role !== 'groom' && !isEditIconHidden && -->
          <i class="fa-solid fa-trash" @click="$emit('onDeleteHandler', id)" />
          <!-- } -->
        </span>
      </p>
      <p class="guests-all-side">
        <span class="guests-all-info-title">Side:</span>
        {{ side }}
      </p>
    </div>
    <div class="guests-all-info-right">
      <p class="guests-all-info">
        <span class="guests-all-info-title">Table:</span>
        {{ table === '' ? 'no info' : table }}
      </p>
      <p class="guests-all-info">
        <span class="guests-all-info-title">Confirmed:</span>
        <i v-if="confirmed" class="fa-solid fa-check" />
        <i v-else class="fa-solid fa-xmark" />
      </p>
      <p class="guests-all-info">
        <span class="guests-all-info-title">Dish:</span>
        <template v-if="mainDish === 'no info'">
          {{ mainDish }}
        </template>
        <i v-else :class="getDishImage" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.guests-all-info-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  margin-left: 500px;
  margin-right: 500px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--clr-gold);
}

.guests-all-info-left {
  width: 86%;
}

.guests-all-role {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--clr-gold);
}

.guests-all-name {
  font-size: 34px;
}

.guests-all-image i {
  font-size: 26px;
  color: var(--clr-gold);
  margin-left: 15px;
}

.guests-all-image i:hover {
  cursor: unset;
}

.guests-all-side {
  font-size: 18px;
}

.guests-all-info {
  font-size: 20px;
  font-weight: 600;
  color: var(--clr-gold);
}

.guests-all-info-title {
  color: var(--clr-black);
  font-weight: 700;
  margin-right: 8px;
}

.guests-all-icons {
  font-size: 22px;
}

.guests-all-icons i:first-of-type {
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 1800px) {
  .guests-all-info-wrapper {
    margin-left: 300px;
    margin-right: 300px;
  }
}

@media screen and (max-width: 1600px) {
  .guests-all-info-wrapper {
    margin-left: 100px;
    margin-right: 100px;
  }
}

@media screen and (max-width: 1200px) {
  .guests-all-info-wrapper {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 120px;
  }

  .guests-all-info-left {
    width: unset;
  }

  .guests-all-role {
    font-size: 22px;
  }

  .guests-all-name {
    font-size: 38px;
  }

  .guests-all-side {
    font-size: 22px;
  }

  .guests-all-info {
    font-size: 22px;
  }
}

@media screen and (max-width: 500px) {
  .guests-all-info-wrapper {
    margin-left: 20px;
    margin-right: 20px;
  }

  .guests-all-name {
    font-size: 34px;
  }
}
</style>
