<template>
  <div :class="$style.Host">
    <canvas :class="$style.Canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  methods: {
    _resize() {
      this.$refs.canvas.width = window.devicePixelRatio * this.$el.offsetWidth;
      this.$refs.canvas.height = window.devicePixelRatio * this.$el.offsetHeight;
    },
  },

  mounted() {
    window.addEventListener('resize', this._resize);
    this._resize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this._resize);
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
