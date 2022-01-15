import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Hunter Larco' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    next();
    if (to.meta.title) {
          document.title =
              typeof to.meta.title == 'function'
              ? to.meta.title(to.params)
              : to.meta.title;
        }
});

export default router
