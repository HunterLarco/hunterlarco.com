import '@/src/web/runtime';

import Vue from 'vue';
import VueGtag from 'vue-gtag';

import App from '@/src/web/App';
import router from '@/src/web/router';

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-59044445-2' },
    enabled: process.fido.env == 'production',
  },
  router
);

const app = new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
