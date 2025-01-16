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

export type Experience = {
  logo: string;
  title: string;
  category: string;
  year: number;
  featured?: boolean;
};

export const EXPERIENCES: Array<Experience> = [
  {
    logo: SootFavicon,
    title: 'SOOT',
    category: 'Full-time',
    year: 2023,
    featured: true,
  },
  {
    logo: FacebookFavicon,
    title: 'Facebook Reality Labs',
    category: 'Full-time',
    year: 2021,
    featured: true,
  },
  {
    logo: SootFavicon,
    title: 'SOOT',
    category: 'Advisor',
    year: 2021,
  },
  {
    logo: DripFavicon,
    title: 'Drip',
    category: 'Advisor',
    year: 2020,
  },
  {
    logo: MozillaFavicon,
    title: 'Mozilla Builders: Superduper',
    category: 'Fellow',
    year: 2020,
  },
  {
    logo: MozillaFavicon,
    title: 'Mozilla Builders: Fido',
    category: 'Fellow',
    year: 2020,
  },
  {
    logo: NotionFavicon,
    title: 'Notion',
    category: 'Full-time',
    year: 2020,
  },
  {
    logo: FireChatFavicon,
    title: 'FireChat',
    category: 'Advisor',
    year: 2020,
  },
  {
    logo: SadboiFavicon,
    title: 'Terrace',
    category: 'Founder',
    year: 2019,
    featured: true,
  },
  {
    logo: OnDeckFavicon,
    title: 'On Deck: 2nd Cohort NYC',
    category: 'Fellow',
    year: 2019,
  },
  {
    logo: OnDeckFavicon,
    title: 'On Deck: 1st Cohort SF',
    category: 'Fellow',
    year: 2019,
    featured: true,
  },
  {
    logo: TriplebyteFavicon,
    title: 'Triplebyte: Generalist',
    category: 'Certificate',
    year: 2019,
  },
  {
    logo: KddFavicon,
    title: 'SIGKDD: Nostalgin',
    category: 'Speaker',
    year: 2019,
    featured: true,
  },
  {
    logo: GoogleFavicon,
    title: 'Google Research: Waybak',
    category: 'Full-time',
    year: 2017,
    featured: true,
  },
  {
    logo: GoogleFavicon,
    title: 'Google Ads: Express',
    category: 'Full-time',
    year: 2016,
    featured: true,
  },
  {
    logo: TriplebyteFavicon,
    title: 'Triplebyte: Generalist',
    category: 'Certificate',
    year: 2016,
  },
  {
    logo: ChromeExperimentsFavicon,
    title: 'Chrome Experiments: voxel.css',
    category: 'Award',
    year: 2016,
  },
  {
    logo: MakeSchoolFavicon,
    title: 'Make School: Inaugral Class',
    category: 'Education',
    year: 2015,
    featured: true,
  },
  {
    logo: ChromeExperimentsFavicon,
    title: 'Chrome Experiments: Wireframe Ripple',
    category: 'Award',
    year: 2015,
  },
];
