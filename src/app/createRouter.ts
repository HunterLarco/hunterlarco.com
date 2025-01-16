import * as vueRouter from 'vue-router';
import * as homePage from '@/app/HomePage';

export const createRouter = (): vueRouter.Router =>
  vueRouter.createRouter({
    history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: homePage.HomePage,
      },
    ],
  });
