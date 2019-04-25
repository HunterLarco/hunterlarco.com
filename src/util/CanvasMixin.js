import { ResponsiveMixin } from '@/util/ResponsiveMixin';

export const CanvasMixin = {
  mixins: [ResponsiveMixin],

  data() {
    return {
      _nextRenderStep: null,
    };
  },

  methods: {
    resize() {
      const canvas = this.$refs.canvas;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = devicePixelRatio * width;
      canvas.height = devicePixelRatio * height;
    },

    step() {
      this._nextRenderStep = requestAnimationFrame(this.step);

      const ctx = this.$refs.canvas.getContext('2d');
      const { width, height } = this.el;

      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.clearRect(0, 0, width, height);

      if (!!this.render) {
        this.render(ctx, width, height);
      }

      ctx.restore();
    },
  },

  created() {
    this.$watch('el.width', this.resize);
    this.$watch('el.height', this.resize);
  },

  mounted() {
    this.step();
  },

  destroyed() {
    if (this._nextRenderStep != null) {
      cancelAnimationFrame(this._nextRenderStep);
    }
  },
};
