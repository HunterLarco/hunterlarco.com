<script setup lang="ts">
import { ref } from 'vue';
import * as components from '@/components';
import * as experiences from '@/app/HomePage/experiences';

const showOnlyFeatured = ref(false);

const experienceFilter = ref<string | null>(null);

const matchesExperienceFilter = (
  experience: experiences.Experience,
): boolean => {
  if (experienceFilter.value == null) {
    return true;
  }

  return experience.category === experienceFilter.value;
};
</script>

<template>
  <div>
    <components.experienceTable.ExperienceTable>
      <components.experienceTable.ExperienceItem
        v-for="experience in experiences.EXPERIENCES"
        v-show="!showOnlyFeatured || experience.featured"
        :style="matchesExperienceFilter(experience) ? null : { opacity: 0.2 }"
        :key="`${experience.title}.${experience.category}.${experience.year}`"
        :logo="experience.logo"
        :title="experience.title"
        :role="experience.category"
        :year="experience.year"
      />
    </components.experienceTable.ExperienceTable>
  </div>
</template>
