import Vue from 'vue';
import Router from 'vue-router';

import Doodad_0000 from '@/src/components/Doodads/0000/Page';
import HomePage from '@/src/components/Pages/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/doodads/0x0000',
      component: Doodad_0000,
    },
    {
      path: '/*',
      component: HomePage,
    },
  ],
});
