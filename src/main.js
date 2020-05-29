import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

import App from '@/src/App';

import { CURRENT_ENV, PROD } from '@/src/util/env_selector';

// TODO: replace PROJECT_ID when you fork this repo
Vue.use(VueAnalytics, {
  id: 'UA-148376095-<PROJECT_ID>',
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
  render: (h) => h(App),
});
