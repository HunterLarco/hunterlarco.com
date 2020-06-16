import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/src/components/Pages/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/doodads/0x0000',
      component: () => import('@/src/components/Doodads/0000/Page'),
    },
    {
      path: '/doodads/0x0001',
      component: () => import('@/src/components/Doodads/0001/Page'),
    },
    {
      path: '/doodads/0x0002',
      component: () => import('@/src/components/Doodads/0002/Page'),
    },
    {
      path: '/doodads/0x0003',
      component: () => import('@/src/components/Doodads/0003/Page'),
    },
    {
      path: '/doodads/0x0004',
      component: () => import('@/src/components/Doodads/0004/Page'),
    },
    {
      path: '/doodads/0x0005',
      component: () => import('@/src/components/Doodads/0005/Page'),
    },
    {
      path: '/doodads/0x0006',
      component: () => import('@/src/components/Doodads/0006/Page'),
    },
    {
      path: '/doodads/0x0007',
      component: () => import('@/src/components/Doodads/0007/Page'),
    },
    {
      path: '/doodads/*',
      component: () => import('@/src/components/Doodads/0004/Page'),
    },
    {
      path: '/*',
      component: HomePage,
    },
  ],
});
