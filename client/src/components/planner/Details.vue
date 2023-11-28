<script>
import plannersService from '../../services/planners';

export default {
  data() {
    return {
      id: this.$route.params.id,
      planner: {},
      isHovering: false,
    };
  },
  async created() {
    await plannersService
      .getById(this.id)
      .then(res => (this.planner = res))
      .catch(err => console.error(err));
  },
  mounted() {
    this.$refs.plannerRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  methods: {
    onDeleteHandler() {
      plannersService
        .deleteById(this.id)
        .then(() => this.$router.push('/plan'))
        .catch(err => console.error(err));
    },
    onMouseEnter() {
      this.isHovering = true;
    },
    onMouseLeave() {
      this.isHovering = false;
    },
  },
};
</script>

<template>
  <section id="details-planner" ref="plannerRef" class="details-planner">
    <div class="section-title-wrapper">
      <h2 class="section-title" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        {{ planner.title }}
        <span v-if="isHovering" class="details-planner-icons">
          <router-link :to="`/plan/edit/${id}`"><i class="fa-solid fa-pen" /></router-link>
          <i class="fa-solid fa-trash" @click="onDeleteHandler" />
        </span>
      </h2>
    </div>
    <div class="details-planner-main-content-wrapper">
      <div class="details-planner-section">
        <div class="details-planner-img-wrapper">
          <img class="img" src="/img/Bride-PNG-Image-30858.png" alt="bride">
        </div>
        <div class="details-planner-img-wrapper">
          <img class="img" src="/img/Groom-PNG-Image-95770.png" alt="groom">
        </div>
      </div>
      <div class="details-planner-section details-planner-border">
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Date:</span>
            {{ planner.date }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Location:</span>
            {{ planner.location }}
          </p>
        </div>
        <p class="details-planner-event-info-description">
          {{ planner.description }}
        </p>
      </div>
      <div class="details-planner-section details-planner-border">
        <h4 class="details-planner-section-title">
          Guests
        </h4>
        <div class="details-planner-btns-wrapper">
          <router-link :to="`/${id}/guest`" class="btn">
            Guests List
          </router-link>
        </div>
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Total guests:</span>
            {{ planner.totalGuests }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Confirmed guests:</span>
            {{ planner.confirmedGuests }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Bride's guests:</span>
            {{ planner.brideGuests }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Groom's guests:</span>
            {{ planner.groomGuests }}
          </p>
        </div>
      </div>
      <div class="details-planner-section details-planner-border">
        <h4 class="details-planner-section-title">
          Budget
        </h4>
        <div class="details-planner-btns-wrapper">
          <router-link :to="`/${id}/budget`" class="btn">
            Costs
          </router-link>
        </div>
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Target budget:</span>
            ${{ planner.budget }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Actual costs:</span>
            ${{ planner.actualCosts }}
          </p>
        </div>
      </div>
      <div class="details-planner-section details-planner-border">
        <h4 class="details-planner-section-title">
          Checklist
        </h4>
        <div class="details-planner-btns-wrapper">
          <router-link class="btn" :to="`/${id}/checklist`">
            Checklist
          </router-link>
        </div>
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Total tasks:</span>
            {{ planner.totalTasks }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Done tasks:</span>
            {{ planner.totalDoneTasks }}
          </p>
        </div>
      </div>
      <div class="details-planner-section details-planner-border">
        <h4 class="details-planner-section-title">
          Plan the big day
        </h4>
        <div class="details-planner-btns-wrapper">
          <router-link class="btn" :to="`/${id}/event`">
            Plan
          </router-link>
        </div>
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Total events:</span>
            {{ planner.totalEvents }}
          </p>
          <p class="details-planner-content">
            <span class="details-planner-title">Highlighted events:</span>
            {{ planner.highlightedEvents }}
          </p>
        </div>
      </div>
      <div class="details-planner-section details-planner-border">
        <h4 class="details-planner-section-title">
          My Notes
        </h4>
        <div class="details-planner-btns-wrapper">
          <router-link class="btn" :to="`/${id}/note`">
            Notes
          </router-link>
        </div>
        <div class="details-planner-content-wrapper">
          <p class="details-planner-content">
            <span class="details-planner-title">Total notes:</span>
            {{ planner.notes }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-planner {
  background-color: var(--clr-light-creme);
}

.details-planner h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.details-planner-icons {
  font-size: 22px;
}

.details-planner-icons i:first-of-type {
  margin-right: 10px;
}

.details-planner-main-content-wrapper {
  padding-bottom: 10px;
}

.details-planner-border {
  border-bottom: 1px solid var(--clr-gold);
  margin-bottom: 50px;
  margin-left: 280px;
  margin-right: 280px;
}

.details-planner-section {
  text-align: center;
  font-size: 36px;
}

.details-planner-section-title {
  font-size: 30px;
  margin-bottom: 50px;
}

.details-planner-title {
  display: inline-block;
  margin-right: 10px;
  font-weight: 800;
  font-size: 24px;
  text-transform: uppercase;
  color: var(--clr-gold);
}

.details-planner-main-content-wrapper .details-planner-section:first-of-type {
  padding-bottom: 50px;
  margin-bottom: 50px;
}

.details-planner-img-wrapper {
  width: 200px;
  height: 600px;
  display: inline-block;
  margin-right: 50px;
}

.details-planner-img-wrapper img {
  max-width: 100%;
}

.details-planner-main-content-wrapper
  .details-planner-section:first-of-type
  .details-planner-img-wrapper:first-of-type
  img {
  max-width: 340px;
}

.details-planner-event-info-description {
  text-align: center;
  font-size: 26px;
  padding-bottom: 80px;
}

.details-planner-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.details-planner-btns-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
}

.details-planner-main-content-wrapper .details-planner-section:last-of-type {
  border-bottom: unset;
}

@media screen and (max-width: 1600px) {
  .details-planner-content-wrapper {
    gap: 30px;
  }
}

@media screen and (max-width: 1200px) {
  #details-planner {
    margin-bottom: 80px;
  }

  .details-planner-content-wrapper {
    flex-direction: column;
    gap: 5px;
  }

  .details-planner-section-title {
    font-size: 28px;
  }

  .details-planner-title {
    font-size: 20px;
  }

  .details-planner-border {
    margin-left: 100px;
    margin-right: 100px;
  }
}

@media screen and (max-width: 900px) {
  #details-planner {
    margin-bottom: 100px;
  }

  .details-planner-section-title {
    font-size: 26px;
  }

  .details-planner-title {
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  .details-planner-main-content-wrapper .details-planner-section:first-of-type {
    padding-bottom: unset;
    margin-bottom: unset;
  }

  .details-planner-img-wrapper {
    display: none;
  }

  .details-planner-event-info-description {
    padding-bottom: 40px;
  }

  .details-planner-section-title {
    font-size: 24px;
  }

  .details-planner-content-wrapper {
    font-size: 28px;
  }

  .details-planner-title {
    font-size: 16px;
  }
}
</style>
