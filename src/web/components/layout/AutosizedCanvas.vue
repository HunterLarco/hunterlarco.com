<template>
  <canvas :class="$style.Host">
    <slot />
  </canvas>
</template>

<script>
export default {
  props: {
    renderFunction: {
      type: Function,
      default: null,
    },

    render: {
      type: Boolean,
      default: false,
    },

    renderMaxFps: {
      type: Number,
      default: 60,
    },
  },

  data() {
    return {
      running_: false,
      forceStop_: false,
      lastRender_: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.forceStop_ = true;
  },

  methods: {
    renderLoop_() {
      if (!this.render || this.forceStop_) {
        this.running_ = false;
        this.lastRender_ = null;
        return;
      }

      const renderData = {
        fps: null,
        elapsedMs: null,
      };

      if (this.lastRender_ !== null) {
        const elapsedTime = Date.now() - this.lastRender_;
        const fps = 1000 / elapsedTime;
        if (fps > this.renderMaxFps) {
          setTimeout(this.renderLoop_, 1000 / this.renderMaxFps - elapsedTime);
          return;
        }

        renderData.fps = fps;
        renderData.elapsedMs = elapsedTime;
      }

      requestAnimationFrame(this.renderLoop_);
      this.lastRender_ = Date.now();
      (this.renderFunction || new Function())(renderData);
    },

    resize() {
      if (this.$el) {
        const pixelRatio = window.devicePixelRatio;
        this.$el.width = pixelRatio * this.$el.offsetWidth;
        this.$el.height = pixelRatio * this.$el.offsetHeight;
      }
    },
  },

  watch: {
    render: {
      immediate: true,
      handler() {
        if (this.render && !this.running_) {
          this.running_ = true;
          this.renderLoop_();
        }
      },
    },
  },
};
</script>

<style module lang="sass">
.Host {
  height: 100%;
  width: 100%;
}
</style>
