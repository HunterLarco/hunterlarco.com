<script setup lang="ts">
import { ref, computed } from 'vue';
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

const categories = computed(
  () =>
    new Set(experiences.EXPERIENCES.map((experience) => experience.category)),
);

const toggleCategory = (category: string): void => {
  if (experienceFilter.value === category) {
    experienceFilter.value = null;
    return;
  }

  experienceFilter.value = category;
};
</script>

<template>
  <div>
    <components.textChip.TextChip
      v-for="category in categories"
      :key="category"
      :selected="experienceFilter === category"
      @click="toggleCategory(category)"
      >{{ category }}</components.textChip.TextChip
    >

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
