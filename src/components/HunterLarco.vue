<template>
  <div :class="$style.Host">
    <canvas :class="$style.Canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stop_: false,
      ctx_: null,
    };
  },

  methods: {
    _resize() {
      this.$refs.canvas.width = devicePixelRatio * this.$el.offsetWidth;
      this.$refs.canvas.height = devicePixelRatio * this.$el.offsetHeight;
    },

    _loop() {
      if (this.stop_) {
        this.stop_ = false;
      } else {
        requestAnimationFrame(this._loop);
      }

      const { width, height } = this.$refs.canvas;
      this.ctx_.clearRect(0, 0, width, height);
    },
  },

  mounted() {
    this.ctx_ = this.$refs.canvas.getContext('2d');

    window.addEventListener('resize', this._resize);
    this._resize();

    this._loop();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this._resize);

    this.stop_ = true;
  },
};
</script>

<style module lang="sass">
.Host {
  overflow: hidden;
}

.Canvas {
  height: 100%;
  width: 100%;
}
</style>
