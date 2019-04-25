import Vue from 'vue';
import Router from 'vue-router';

import BioPage from '@/components/Pages/BioPage';
import ExperimentsPage from '@/components/Pages/ExperimentsPage';
import YouAreLostPage from '@/components/Pages/YouAreLostPage';
import InteractiveResumePage from '@/components/Pages/InteractiveResumePage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BioPage,
    },
    {
      path: '/resume',
      component: InteractiveResumePage,
    },
    {
      path: '/experiments',
      component: ExperimentsPage,
    },
    {
      path: '/*',
      component: YouAreLostPage,
    },
  ],
});
