import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import('@/src/web/components/pages/Landing'),
      meta: { title: 'Hunter Larco' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
  if (to.meta.title) {
    document.title =
      typeof to.meta.title == 'function'
        ? to.meta.title(to.params)
        : to.meta.title;
  }
});

export default router;
