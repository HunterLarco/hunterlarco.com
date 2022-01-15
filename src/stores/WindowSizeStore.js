import { createStore } from 'vuex';
import { applyDefaults } from '@/stores/util';

export const Sizes = new Map();
Sizes.set('mobile', 450);
Sizes.set('tablet', 1024);
Sizes.set('lowdpi', 1280);
Sizes.set('highdpi', 1440);

export default createStore(applyDefaults('WindowSizeStore', {
  state: {
    width: window.innerWidth,
  },

  getters: {
    size(state) {
      let size = null;
      for (const [label, width] of Sizes.entries()) {
        if (state.width < width) {
          size = label;
          break;
        }
      }
      return size;
    },
  },

  actions: {
    updateWidth({ commit }) {
      commit('setWidth', window.innerWidth);
    },

    autoUpdateWidth({ dispatch }) {
      dispatch('updateWidth');
      window.addEventListener('resize', () => {
        dispatch('updateWidth');
      });
    },
  },

  mutations: {
    setWidth(state, width) {
      state.width = width;
    },
  },
}));
