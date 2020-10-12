import WindowSizeStore, { Sizes } from '@/src/web/stores/WindowSizeStore';

export default {
  install(Vue) {
    Vue.prototype.$sizing = (fallback, sizingMap) => {
      if (!sizingMap) {
        sizingMap = { [fallback]: true };
        fallback = false;
      }

      const labels = Array.from(Sizes.keys());
      const startIndex = labels.indexOf(WindowSizeStore.getters.size);

      if (startIndex == -1) {
        return fallback;
      }

      for (let i = startIndex; i < labels.length; ++i) {
        const label = labels[i];
        if (sizingMap[label] !== undefined) {
          return sizingMap[label];
        }
      }

      return fallback;
    };

    Vue.prototype.$sizing.gt = (width) => {
      return WindowSizeStore.state.width > width;
    };

    Vue.prototype.$sizing.gte = (width) => {
      return WindowSizeStore.state.width >= width;
    };

    Vue.prototype.$sizing.lt = (width) => {
      return WindowSizeStore.state.width < width;
    };

    Vue.prototype.$sizing.lte = (width) => {
      return WindowSizeStore.state.width <= width;
    };
  },
};
