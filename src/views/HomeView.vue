<script setup lang="ts">
import * as components from '@/components';

import FacebookFavicon from '@/assets/favicons/Facebook.jpeg';
import SadboiFavicon from '@/assets/favicons/Sadboi.png';
import MozillaFavicon from '@/assets/favicons/Mozilla.png';
import NotionFavicon from '@/assets/favicons/Notion.png';
import FireChatFavicon from '@/assets/favicons/FireChat.png';
import SootFavicon from '@/assets/favicons/Soot.png';
import MakeSchoolFavicon from '@/assets/favicons/MakeSchool.png';
import DripFavicon from '@/assets/favicons/Drip.png';
import TriplebyteFavicon from '@/assets/favicons/Triplebyte.jpg';
import OnDeckFavicon from '@/assets/favicons/OnDeck.png';
import KddFavicon from '@/assets/favicons/KDD.png';
import GoogleFavicon from '@/assets/favicons/Google.svg';
import ChromeExperimentsFavicon from '@/assets/favicons/ChromeExperiments.png';

const experiences: Array<components.experienceTable.ExperienceItemProps> = [
  {
    logo: SootFavicon,
    title: 'SOOT',
    role: 'Full-time',
    year: 2023,
  },
  {
    logo: FacebookFavicon,
    title: 'Facebook Reality Labs: XROS',
    role: 'Full-time',
    year: 2021,
  },
  {
    logo: SootFavicon,
    title: 'SOOT',
    role: 'Advisor',
    year: 2021,
  },
  {
    logo: DripFavicon,
    title: 'Drip',
    role: 'Advisor',
    year: 2020,
  },
  {
    logo: MozillaFavicon,
    title: 'Mozilla Builders: Superduper',
    role: 'Fellow',
    year: 2020,
  },
  {
    logo: MozillaFavicon,
    title: 'Mozilla Builders: Fido',
    role: 'Fellow',
    year: 2020,
  },
  {
    logo: NotionFavicon,
    title: 'Notion',
    role: 'Full-time',
    year: 2020,
  },
  {
    logo: FireChatFavicon,
    title: 'FireChat',
    role: 'Advisor',
    year: 2020,
  },
  {
    logo: SadboiFavicon,
    title: 'Terrace',
    role: 'Founder',
    year: 2019,
  },
  {
    logo: OnDeckFavicon,
    title: 'On Deck: 2nd Cohort NYC',
    role: 'Fellow',
    year: 2019,
  },
  {
    logo: OnDeckFavicon,
    title: 'On Deck: 1st Cohort SF',
    role: 'Fellow',
    year: 2019,
  },
  {
    logo: TriplebyteFavicon,
    title: 'Triplebyte: Generalist',
    role: 'Certificate',
    year: 2019,
  },
  {
    logo: KddFavicon,
    title: 'SIGKDD: Nostalgin',
    role: 'Speaker',
    year: 2019,
  },
  {
    logo: GoogleFavicon,
    title: 'Google Research: Waybak',
    role: 'Full-time',
    year: 2017,
  },
  {
    logo: GoogleFavicon,
    title: 'Google Ads: Express',
    role: 'Full-time',
    year: 2016,
  },
  {
    logo: TriplebyteFavicon,
    title: 'Triplebyte: Generalist',
    role: 'Certificate',
    year: 2016,
  },
  {
  logo: ChromeExperimentsFavicon,
  title: 'Chrome Experiments: voxel.css',
  role: 'Award',
  year: '2016',
  },
  {
  logo: MakeSchoolFavicon,
  title: 'Make School: Inaugral Class',
  role: 'Education',
  year: '2015',
  },
  {
  logo: ChromeExperimentsFavicon,
  title: 'Chrome Experiments: Wireframe Ripple',
  role: 'Award',
  year: '2015',
  },
];
</script>

<template>
  <div>
    <components.experienceTable.ExperienceTable>
      <components.experienceTable.ExperienceItem
        v-for="experience in experiences"
        :key="`${experience.title}.${experience.role}.${experience.year}`"
        :logo="experience.logo"
        :title="experience.title"
        :role="experience.role"
        :year="experience.year"
      />
    </components.experienceTable.ExperienceTable>
  </div>
</template>
