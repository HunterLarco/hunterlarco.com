<script setup lang="ts">
import * as components from '@/components';

import FacebookFavicon from '@/assets/favicons/Facebook.jpeg'
import MozillaFavicon from '@/assets/favicons/Mozilla.png'
</script>

<template>
  <div>
    <components.experienceTable.ExperienceTable>
      <components.experienceTable.ExperienceItem :logo="FacebookFavicon" title="Facebook Reality Labs" role="Full-time" year="2021" />
      <components.experienceTable.ExperienceItem :logo="MozillaFavicon" title="Mozilla Builders: Superduper" role="Fellow" year="2020" />
    </components.experienceTable.ExperienceTable>
  </div>
</template>
