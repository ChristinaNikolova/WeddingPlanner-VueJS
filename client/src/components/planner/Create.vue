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
      serverError: '',
      formName: formNames.CREATE,
    };
  },
  methods: {
    async onSubmitHandler(description, date, budget, location, bride, groom) {
      await plannersService
        .create(description, date, budget, location, bride, groom)
        .then((res) => {
          if (res.message) {
            this.serverError = res.message;
            return;
          }
          this.$router.push({ path: `/plan/${res._id}` });
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
