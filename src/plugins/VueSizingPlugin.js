import WindowSizeStore, { Sizes } from '@/stores/WindowSizeStore';

export default {
  install(app) {
     app.config.globalProperties.$sizing = (fallback, sizingMap) => {
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

     app.config.globalProperties.$sizing.gt = (width) => {
      return WindowSizeStore.state.width > width;
    };

     app.config.globalProperties.$sizing.gte = (width) => {
      return WindowSizeStore.state.width >= width;
    };

     app.config.globalProperties.$sizing.lt = (width) => {
      return WindowSizeStore.state.width < width;
    };

     app.config.globalProperties.$sizing.lte = (width) => {
      return WindowSizeStore.state.width <= width;
    };
  },
};
