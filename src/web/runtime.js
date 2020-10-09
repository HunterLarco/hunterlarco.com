import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

if (process.fido.env == 'local') {
  require('@/src/web/debug/console');
}
