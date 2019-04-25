import throttle from 'lodash.throttle';
import ResizeObserver from 'resize-observer-polyfill';

export const ResponsiveMixin = {
  data() {
    return {
      el: {
        width: 0,
        height: 0,
        is: {},
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      const observer = new ResizeObserver(
        throttle((entries) => {
          const { width, height } = entries[0].target.getBoundingClientRect();

          this.el.width = width;
          this.el.height = height;

          const breakpoints = Object.assign(
            {},
            this.breakpoints || {},
            this.$options.breakpoints || {}
          );
          for (const [name, criteria] of Object.entries(breakpoints)) {
            this.$set(this.el.is, name, criteria(width, height));
          }
        }, 200)
      );

      if (this.$el instanceof Element) {
        observer.observe(this.$el);
      }
    });
  },
};
