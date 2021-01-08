import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(require('@/src/web/plugins/VueSizingPlugin').default);

if (process.fido.env == 'local') {
  require('@/src/web/debug/console');
}

const WindowSizeStore = require('@/src/web/stores/WindowSizeStore').default;
WindowSizeStore.dispatch('autoUpdateWidth');
