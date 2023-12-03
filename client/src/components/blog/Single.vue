<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    className: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
    shortContent: {
      type: String,
      required: true,
      default: '',
    },
    createdAt: {
      type: String,
      required: true,
      default: '',
    },
    categoryName: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<template>
  <article class="article-single" :style="{ flexDirection: `${className === 'left' ? 'row-reverse' : 'row'}` }">
    <div class="article-single-content-wrapper">
      <h5 class="article-single-title">
        {{ title }}
      </h5>
      <p class="article-single-date">
        {{ createdAt }}
      </p>
      <h6 class="article-single-category">
        {{ categoryName }}
      </h6>
      <p class="article-single-short-content">
        {{ shortContent }}
      </p>
      <router-link class="btn" :to="`/blog/${id}`">
        Read more
      </router-link>
    </div>
    <img class="article-single-image img img-shadow" :src="image" :alt="title">
  </article>
</template>

<style scoped>
.article-single {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 300px;
  margin-bottom: 150px;
}

.article-single:hover .article-single-image {
  opacity: 0.7;
  transition: opacity 0.4s ease-out;
}

.article-single:hover .article-single-content-wrapper {
  opacity: 0.9;
  transition: opacity 0.4s ease-out;
}

.article-single-content-wrapper {
  text-align: left;
}

.article-single-title {
  font-size: 38px;
  font-weight: 500;
  letter-spacing: 2.2px;
  margin-bottom: 30px;
}

.article-single-date {
  font-size: 22px;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.article-single-category {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin-bottom: 50px;
}

.article-single-short-content {
  font-size: 24px;
  line-height: 2;
  letter-spacing: 0.7px;
  margin-bottom: 50px;
}

.article-single-image {
  min-height: 900px;
  max-width: 40%;
}

@media screen and (max-width: 1650px) {
  .article-single {
    padding-right: 30px;
    padding-left: 30px;
    gap: 100px;
  }
}

@media screen and (max-width: 1250px) {
  .article-single {
    gap: 50px;
  }
}

@media screen and (max-width: 1100px) {
  .article-single {
    flex-direction: column !important;
    gap: 70px;
  }

  .article-single-image {
    max-width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .article-single-title {
    font-size: 32px;
  }

  .article-single-date,
  .article-single-category {
    font-size: 20px;
  }

  .article-single-short-content {
    font-size: 22px;
  }

  .article-single-image {
    min-height: 700px;
  }
}
</style>
