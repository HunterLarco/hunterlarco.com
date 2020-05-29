import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/src/components/Pages/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      component: HomePage,
    },
  ],
});
