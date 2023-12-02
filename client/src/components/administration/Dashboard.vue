<template>
  <section id="dashboard" class="section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Administration
      </h2>
    </div>
    <div class="dashboard-content-wrapper">
      <img class="dashboard-img img-shadow" src="./../../../public/img/groom-505683_1920.jpg" alt="groom">
      <ul class="dashboard-ul">
        <li class="dashboard-li title-li">
          Articles
        </li>
        <li class="dashboard-li">
          <router-link class="navigation-link btn" to="/administration/articles/create">
            Create Article
          </router-link>
        </li>
        <li class="dashboard-li title-li">
          Categories
        </li>
        <li class="dashboard-li">
          <router-link class="navigation-link btn" to="/administration/categories">
            All Categories
          </router-link>
        </li>
        <li class="dashboard-li">
          <router-link class="navigation-link btn" to="/administration/categories/create">
            Create Category
          </router-link>
        </li>
      </ul>
      <img class="dashboard-img img-shadow" src="./../../../public/img/bride-428105_1920.jpg" alt="bride">
    </div>
  </section>
</template>

<style scoped>
.dashboard-content-wrapper {
  margin-top: 80px;
  margin-bottom: 40px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}

.dashboard-li {
  margin-bottom: 50px;
}

.title-li {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 24px !important;
}

.dashboard-img {
  max-width: 30%;
  height: 700px;
}

@media screen and (max-width: 1100px) {
  .dashboard-content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .dashboard-img {
    max-width: 100%;
  }
}

@media screen and (max-width: 650px) {
  #dashboard {
    margin-bottom: 80px;
  }
}
</style>
