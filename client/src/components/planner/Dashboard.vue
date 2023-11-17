<script>
import plannersService from '../../services/planners';
import { bottom } from '../../utils/constants/images';
import Bottom from '../shared/images/Bottom.vue';

export default {
  components: {
    Bottom,
  },
  data() {
    return {
      planners: [],
      first: bottom.FIRST,
      second: bottom.SECOND,
      third: bottom.THIRD,
    };
  },
  async mounted() {
    await plannersService
      .all()
      .then(res => (this.planners = res))
      .catch(err => console.error(err));
  },
};
</script>

<template>
  <section id="dashboard" class="dashboard section-background">
    <div class="section-title-wrapper">
      <h2 class="section-title">
        Plan you wedding
      </h2>
    </div>
    <div class="dashboard-content-wrapper">
      <div class="dashboard-left-wrapper">
        <h2 class="dashboard-left-title">
          My planners
        </h2>
        <template v-if="planners.length">
          <router-link
            v-for="p in planners"
            :key="p.id"
            :to="`/plan/${p.id}`"
            class="dashboard-left-link"
          >
            <i class="fa-solid fa-heart" />
            {{ p.title }}
          </router-link>
        </template>
        <p v-else class="dashboard-left-no-planners">
          No planners yet
        </p>
      </div>
      <div class="dashboard-right-wrapper">
        <router-link to="/plan/create" class="btn">
          Create new planner
        </router-link>
      </div>
    </div>
    <Bottom :first="first" :second="second" :third="third" />
  </section>
</template>

<style scoped>
.dashboard-content-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 50vh;
}

.dashboard-right-wrapper a {
  padding: 32px 50px;
  font-size: 30px;
}

.dashboard-left-wrapper {
  text-align: center;
}

.dashboard-left-title {
  font-size: 56px;
  margin-bottom: 12px;
}

.dashboard-left-no-planners {
  font-size: 36px;
}

.dashboard-left-wrapper .dashboard-left-link:first-of-type {
  margin-top: 20px;
}

.dashboard-left-link {
  font-size: 26px;
  transition: all 600ms ease-in-out;
  display: block;
  margin-bottom: 10px;
}

.dashboard-left-link:hover {
  color: var(--clr-gold);
  font-weight: 600;
  font-size: 28px;
}

.dashboard-left-link i {
  font-size: 18px;
  margin-right: 12px;
}

@media screen and (max-width: 1100px) {
  .dashboard-content-wrapper {
    flex-direction: column;
    gap: 80px;
    padding: 100px 30px 150px 30px;
  }

  .dashboard-left-title {
    font-size: 48px;
  }

  .dashboard-right-wrapper a {
    padding: 22px 30px;
    font-size: 20px;
  }
}

@media screen and (max-width: 700px) {
  #dashboard {
    margin-bottom: 100px;
  }

  .dashboard-content-wrapper {
    padding-top: 20px;
  }

  .dashboard-left-title {
    font-size: 36px;
  }

  .dashboard-left-link {
    font-size: 22px;
  }
}

@media screen and (max-width: 400px) {
  .dashboard-content-wrapper {
    gap: 20px;
    padding: 20px 30px 70px 30px;
  }
}

@media screen and (max-width: 350px) {
  .dashboard-right-wrapper a {
    padding: 18px 26px;
    font-size: 18px;
  }
}
</style>
