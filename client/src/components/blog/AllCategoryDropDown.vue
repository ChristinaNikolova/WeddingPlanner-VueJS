<script>
import categoriesService from '../../services/categories';
import { category } from '../../utils/constants/model';
import { classNames } from '../../utils/constants/global';
import dropdown from '../../utils/helpers/dropdown';

export default {
  props: {
    selectedCategoryName: {
      type: String,
    },
  },
  emits: ['onCategoryHandler', 'onRemoveCategotyHandler '],
  data() {
    return {
      categories: [],
      // todo try to use select default lecture!!!
      defaultCategoryId: category.DEFAULT_CATEGORY_SELECTED_ID,
      classNames,
    };
  },
  async mounted() {
    await categoriesService
      .all()
      .then((res) => {
        res = res.filter(el => el.id !== this.defaultCategoryId);
        this.categories = res;
      })
      .catch(err => console.error(err));
  },
  methods: {
    onToggleHandler(e) {
      const dropdownElement = e.target.nextElementSibling;
      dropdownElement.classList.contains(classNames.SHOW)
        ? dropdown.toggle(dropdownElement, classNames.SHOW, classNames.HIDE)
        : dropdown.toggle(dropdownElement, classNames.HIDE, classNames.SHOW);
    },
    onClickCategoryHandler(e) {
      dropdown.toggle(e.target.parentElement, classNames.SHOW, classNames.HIDE);
      this.$emit('onCategoryHandler', e);
    },
  },
};
</script>

<template>
  <div class="article-all-category-drop-down-wrapper">
    <span class="articles-all-category-drop-down">Category:</span>
    <button class="articles-all-category-drop-down-btn" @click="onToggleHandler">
      {{ selectedCategoryName }}
      <i v-if="selectedCategoryName !== 'all'" class="fa-solid fa-xmark" @click.stop="$emit('onRemoveCategotyHandler')" />
    </button>
    <ul class="articles-all-category-drop-down-ul hide">
      <li
        v-for="c in categories"
        :id="c.id"
        :key="c.id"
        class="articles-all-category-drop-down-li"
        @click="onClickCategoryHandler($event)"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.articles-all-category-drop-down-btn {
  border: unset;
  background-color: unset;
  font-size: 34px;
  font-family: var(--font-family);
  color: var(--clr-black);
  text-transform: uppercase;
  letter-spacing: 1.7px;
  transition: all 200ms ease-in-out;
  position: relative;
}

.articles-all-category-drop-down-btn:hover {
  cursor: pointer;
  color: var(--clr-gold);
  font-weight: 600;
}

.articles-all-category-drop-down-btn i {
  position: absolute;
  top: 14px;
}

.articles-all-category-drop-down-ul {
  -webkit-box-shadow: 5px 5px 20px 5px rgba(223, 223, 223, 0.3);
  box-shadow: 5px 5px 20px 5px rgba(223, 223, 223, 0.3);
  max-width: 320px;
}

.articles-all-category-drop-down-li {
  transition: all 200ms ease-in-out;
  font-size: 26px;
  padding: 10px;
}

.articles-all-category-drop-down-li:hover {
  color: var(--clr-gold);
  cursor: pointer;
  font-weight: 600;
}

@media screen and (max-width: 1100px) {
  .articles-all-category-drop-down-ul {
    max-width: 100%;
  }
}
</style>
