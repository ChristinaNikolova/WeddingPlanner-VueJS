<script>
import { formNames } from '../../utils/constants/global';
import AppTextArea from '../shared/inputs/AppTextArea.vue';
import AppInput from '../shared/inputs/AppInput.vue';

export default {
  components: {
    AppTextArea,
    AppInput,
  },
  data() {
    return {
      form: formNames.CREATE,
      description: '',
      date: '',
      budget: 0,
      location: '',
      bride: '',
      groom: '',
    };
  },
};
</script>

<template>
  <section class="section-background">
    <!-- {serverError && <ServerError errors={serverError} />} -->
    <div class="section-title-wrapper">
      <h2 class="section-title">
        {{ name }} Planner
      </h2>
    </div>
    <div class="form-wrapper-center">
      <form class="form-width">
        <div class="form-wrapper">
          <AppTextArea
            v-model="description"
            name="description"
            label="Description"
            :model-value="description"
            rows="8"
          />
          <!-- {descriptionError && <ClientError error="{descriptionError}" />} -->
        </div>
        <div class="form-wrapper">
          <AppInput
            v-model="date"
            name="date"
            type="text"
            label="Date"
            :model-value="date"
          />
          <!-- {dateError && <ClientError error="{dateError}" />} -->
        </div>
        <div class="form-wrapper">
          <AppInput
            v-model="budget"
            name="budget"
            type="number"
            label="Budget"
            :model-value="budget"
          />
          <!-- {budgetError && <ClientError error="{budgetError}" />} -->
        </div>
        <div class="form-wrapper">
          <AppInput
            v-model="location"
            name="location"
            type="text"
            label="Location"
            :model-value="location"
          />
          <!-- {locationError && <ClientError error="{locationError}" />} -->
        </div>
        <div class="form-wrapper">
          <AppInput
            v-model="bride"
            name="bride"
            type="text"
            label="Bride"
            :model-value="bride"
          />
          <!-- {brideError && <ClientError error="{brideError}" />} -->
        </div>
        <div class="form-wrapper">
          <AppInput
            v-model="groom"
            name="groom"
            type="text"
            label="Groom"
            :model-value="groom"
          />
          <!-- {groomError && <ClientError error="{groomError}" />} -->
        </div>
        <!-- <FormButton
          form-name="{formName}"
          is-disabled="{isDisabled}"
          on-cancel-form-handler="{onCancelFormHandler}"
        /> -->
      </form>
    </div>
  </section>
</template>
