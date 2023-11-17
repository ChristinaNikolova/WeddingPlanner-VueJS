<template>
  <section class="not-found">
    <h2 class="not-found-main-title">
      404
    </h2>
    <h4 class="not-found-sub-title">
      Page not found
    </h4>
    <p class="not-found-content">
      Sorry, the page you are looking for doesn't exist
    </p>
    <router-link to="/" class="btn">
      Go back to home
    </router-link>
  </section>
</template>

<style scoped>
.not-found {
  background-color: var(--clr-creme);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.not-found-main-title {
  font-size: 400px;
  margin-bottom: 10px;
}

.not-found-sub-title {
  font-size: 80px;
  margin-bottom: 50px;
}

.not-found-content {
  font-size: 30px;
  margin-bottom: 80px;
}

@media screen and (max-width: 1200px) {
  .not-found {
    margin-bottom: 50px;
  }

  .not-found-main-title {
    font-size: 350px;
  }

  .not-found-sub-title {
    font-size: 70px;
  }

  .not-found-content {
    font-size: 26px;
  }
}

@media screen and (max-width: 800px) {
  .not-found {
    text-align: center;
    padding-right: 20px;
    padding-left: 20px;
  }

  .not-found-main-title {
    font-size: 300px;
  }

  .not-found-sub-title {
    font-size: 60px;
  }

  .not-found-content {
    font-size: 24px;
  }
}

@media screen and (max-width: 700px) {
  .not-found {
    margin-bottom: 90px;
  }
}

@media screen and (max-width: 600px) {
  .not-found-main-title {
    font-size: 200px;
  }

  .not-found-sub-title {
    font-size: 50px;
  }

  .not-found-content {
    font-size: 20px;
  }
}

@media screen and (max-width: 400px) {
  .not-found-main-title {
    font-size: 100px;
  }

  .not-found-sub-title {
    font-size: 30px;
  }

  .not-found-content {
    font-size: 18px;
  }
}
</style>
