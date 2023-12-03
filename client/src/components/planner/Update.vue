<script>
import plannersService from '../../services/planners';
import { formNames } from '../../utils/constants/global';
import PlannerForm from './Form.vue';

export default {
  components: { PlannerForm },
  data() {
    return {
      data: {
        description: '',
        date: '',
        budget: '',
        location: '',
        bride: '',
        groom: '',
      },
      brideId: '',
      groomId: '',
      formName: formNames.UPDATE,
      id: this.$route.params.id,
      serverError: '',
    };
  },
  async created() {
    await plannersService
      .getById(this.id)
      .then((res) => {
        this.data.description = res.description;
        this.data.date = res.date;
        this.data.budget = res.budget;
        this.data.location = res.location;
        this.data.bride = res.bride;
        this.brideId = res.brideId;
        this.data.groom = res.groom;
        this.groomId = res.groomId;
      }).catch(err => console.error(err));
  },
  methods: {
    async onSubmitHandler(description, date, budget, location, bride, groom) {
      await plannersService
        .update(this.id, description, date, budget, location, bride, this.brideId, groom, this.groomId)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.$router.push({ path: '/plan' });
        })
        .catch(err => console.error(err));
    },
  },
};
</script>

<template>
  <PlannerForm
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
  />
</template>
