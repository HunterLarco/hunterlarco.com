import Vue from 'vue';
import Router from 'vue-router';

import Doodad_0000 from '@/src/components/Doodads/0000/Page';
import Doodad_0001 from '@/src/components/Doodads/0001/Page';
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
      path: '/doodads/0x0001',
      component: Doodad_0001,
    },
    {
      path: '/*',
      component: HomePage,
    },
  ],
});
