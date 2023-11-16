<script>
// todo import Link

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
    shortContent: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="last-three-articles-current-article-wrapper">
    <img
      class="last-three-articles-current-article-image img img-shadow"
      :src="image"
      :alt="title"
    >
    <h5 class="last-three-articles-current-article-title">
      {{ title }}
    </h5>
    <p class="last-three-articles-current-article-short-content">
      {{ shortContent }}
    </p>
    <!-- <Link class="btn" to={`/blog/${id}`}>Read more</Link> -->
  </div>
</template>

<style scoped>
.last-three-articles-current-article-wrapper {
  text-align: center;
}

.last-three-articles-current-article-image {
  max-width: 100%;
  height: 800px;
  margin-bottom: 30px;
}

.last-three-articles-current-article-title {
  font-size: 36px;
  margin-bottom: 30px;
}

.last-three-articles-current-article-short-content {
  font-size: 24px;
  margin-bottom: 80px;
}

@media screen and (max-width: 1750px) {
  .last-three-articles-current-article-image {
    height: 600px;
  }

  .last-three-articles-current-article-title {
    font-size: 30px;
  }

  .last-three-articles-current-article-short-content {
    font-size: 22px;
  }
}

@media screen and (max-width: 1600px) {
  .last-three-articles-current-article-title {
    font-size: 28px;
  }

  .last-three-articles-current-article-short-content {
    font-size: 18px;
  }
}

@media screen and (max-width: 1200px) {
  .last-three-articles-current-article-title {
    font-size: 30px;
  }

  .last-three-articles-current-article-short-content {
    font-size: 22px;
  }
}
</style>
