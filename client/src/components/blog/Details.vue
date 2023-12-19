<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import articlesService from '../../services/articles';
import form from '../../utils/helpers/form';
import likes from '../../utils/helpers/likes';
import AllComments from '../comment/All.vue';
import LastThreeArticles from '../shared/Blog/LastThreeArticles.vue';

const store = useAuthStore();
const route = useRoute();
const router = useRouter();
let id = route.params.id;
const article = ref({});
const likeCounts = ref(0);
const isLiked = ref(false);
const isLoading = ref(true);

onMounted(() => {
  loadArticle();
});

watch(route, (newValue) => {
  id = newValue.params.id;
  loadArticle();
});

function onDeleteHandler() {
  articlesService
    .deleteById(id)
    .then(() => {
      router.push('/blog?page=1&category=all&categoryId=default&query=');
    })
    .catch(err => console.error(err));
};

function like() {
  articlesService
    .like(id)
    .then((res) => {
      isLiked.value = getLikes(res.likes);
      likeCounts.value = res.likes.length;
    })
    .catch(err => console.error(err));
};

function loadArticle() {
  articlesService
    .getById(id)
    .then((res) => {
      article.value = res;
      likeCounts.value = res.likes.length;
      isLiked.value = getLikes(res.likes);
      isLoading.value = false;
      form.scrollToTop();
    })
    .catch(err => console.error(err));
};

function getLikes(result) {
  return likes.setIsLikedHelper(result, store.user.userId);
}
</script>

<template>
  <Loading v-if="isLoading" />
  <section v-else class="article-details">
    <Jumbotron
      :path-to-image="article.jumboImage"
      :is-home-page="false"
    />
    <h1 class="article-details-title">
      {{ article.title }}
    </h1>
    <div class="article-details-btn-wrapper" />
    <div class="article-details-main-content-wrapper">
      <div class="article-details-list-image">
        <img class="article-details-image img img-shadow" :src="article.image" :alt="article.title">
        <ul class="article-details-ul">
          <li class="article-details-li">
            <span class="article-details-li-span"> Category:</span>
            <img class="img" :src="article.category?.image" :alt="article.category?.name">
            {{ article.category?.name }}
          </li>
          <li class="article-details-li">
            <span class="article-details-li-span">Date:</span>
            {{ article.createdAt }}
          </li>
          <li class="article-details-li">
            <span class="article-details-li-span">Likes:</span>
            {{ likeCounts }}
            <i v-if="isLiked" class="fa-solid fa-heart" @click="like" />
            <i v-else class="fa-regular fa-heart" @click="like" />
          </li>
          <li v-if="store.user.isAdmin" class="article-details-li">
            <router-link :to="`/administration/articles/edit/${id}`">
              <i class="fa-solid fa-pen" />
            </router-link>
            <i class="fa-solid fa-trash" @click="onDeleteHandler" />
          </li>
        </ul>
      </div>
      <div class="article-details-content">
        <p class="article-details-bold-content">
          {{ article.shortContent }}
        </p>
        <p v-for="(el, i) in article.content" :key="{ i }" class="article-details-content-text">
          {{ el }}
        </p>
      </div>
    </div>
    <div class="article-details-btn-wrapper">
      <router-link to="/blog" class="btn">
        Back
      </router-link>
    </div>
    <AllComments :initial-article-id="id" />
    <LastThreeArticles />
  </section>
</template>

<style scoped>
.article-details-title {
  color: var(--clr-black);
  font-size: 36px;
  font-weight: 200;
  letter-spacing: 1.9px;
  text-align: center;
  margin-bottom: 160px;
  position: relative;
}

.article-details-title::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 90px;
  transform: translateX(-50%);
  border-bottom: 2px solid var(--clr-gold);
  width: 220px;
}

.article-details-main-content-wrapper {
  display: flex;
  justify-content: center;
  gap: 200px;
}

.article-details-image {
  max-width: 600px;
  height: 900px;
  margin-bottom: 20px;
}

.article-details-ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 24px;
  padding-left: 50px;
}

.article-details-ul .article-details-li:first-of-type {
  display: flex;
  justify-content: center;
  align-items: center;
}

.article-details-ul .article-details-li:first-of-type img {
  margin-right: 12px;
  border-radius: 100%;
}

.article-details-ul .article-details-li:nth-child(3) i {
  margin-left: 10px;
}

.article-details-ul .article-details-li:last-of-type i:first-of-type {
  margin-right: 20px;
}

.article-details-ul img {
  width: 36px;
  height: 36px;
}

.article-details-li {
  color: var(--clr-gold);
  font-weight: 500;
  margin-bottom: 12px;
}

.article-details-li-span {
  margin-right: 12px;
  color: var(--clr-black);
}

.article-details-content {
  max-width: 900px;
  font-size: 26px;
  letter-spacing: 0.5px;
  text-align: left;
}

.article-details-bold-content {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 16px;
}

.article-details-content-text {
  margin-bottom: 35px;
}

.article-details-btn-wrapper {
  text-align: right;
  margin: 80px 150px 80px 0px;
}

@media screen and (max-width: 1800px) {
  .article-details-main-content-wrapper {
    padding-right: 50px;
    padding-left: 50px;
    gap: 100px;
  }

  .article-details-content {
    font-size: 22px;
  }

  .article-details-bold-content {
    font-size: 24px;
  }
}

@media screen and (max-width: 1300px) {
  .article-details-main-content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .article-details-image {
    width: 100%;
  }

  .article-details-ul {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 30px;
    font-size: 20px;
    padding-left: unset;
  }

  .article-details-content {
    font-size: 20px;
  }

  .article-details-bold-content {
    font-size: 22px;
  }
}

@media screen and (max-width: 1000px) {
  .article-details-content {
    max-width: 600px;
    padding-right: 30px;
    padding-left: 30px;
  }

  .article-details-content {
    font-size: 18px;
  }

  .article-details-bold-content {
    font-size: 20px;
  }

  .article-details-btn-wrapper {
    text-align: center;
    margin: 40px auto 80px auto;
  }
}

@media screen and (max-width: 650px) {
  .article-details-ul {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
