import Vue from 'vue';

import createStore from '@/src/web/helpers/createStore';

export const Sizes = new Map();
Sizes.set('mobile', 450);
Sizes.set('tablet', 1024);
Sizes.set('lowdpi', 1280);
Sizes.set('highdpi', 1440);

export default createStore('WindowSizeStore', {
  state: {
    size: null,
  },

  actions: {
    updateSize({ commit }) {
      let size = null;
      for (const [label, width] of Sizes.entries()) {
        if (window.innerWidth < width) {
          size = label;
          break;
        }
      }

      commit('setSize', size);
    },

    autoUpdateSize({ dispatch }) {
      dispatch('updateSize');
      window.addEventListener('resize', () => {
        dispatch('updateSize');
      });
    },
  },

  mutations: {
    setSize(state, size) {
      if (size && !Sizes.has(size)) {
        throw new Error(`Unknown size ${size}`);
      }

      Vue.set(state, 'size', size);
    },
  },
});
