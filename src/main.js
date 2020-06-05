import Vue from 'vue';

import DatGui from '@cyrilf/vue-dat-gui';
import VueAnalytics from 'vue-analytics';

import App from '@/src/App';
import router from '@/src/router';

import { CURRENT_ENV, PROD } from '@/src/util/env_selector';

Vue.use(DatGui);

Vue.use(VueAnalytics, {
  id: 'UA-59044445-2',
  checkDuplicatedScript: true,
  debug: {
    enabled: CURRENT_ENV != PROD,
    sendHitTask: CURRENT_ENV == PROD,
  },
  autoTracking: {
    exception: true,
  },
});

const app = new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
