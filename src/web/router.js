import VueRouter from 'vue-router';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/history/google-ads',
      component: () => import('@/src/web/components/pages/GoogleAds'),
      meta: { title: 'Hunter Larco / History / Google Ads' },
    },

    {
      path: '/lab/fft',
      component: () => import('@/src/web/components/pages/lab/FFT'),
      meta: { title: 'Hunter Larco / Lab / FFT' },
    },

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
