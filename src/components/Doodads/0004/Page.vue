<template>
  <div :class="$style.Host" @mousemove="onMouseMove_">
    <div :class="$style.Text">404 Not Found</div>
    <canvas ref="screen" :class="$style.Screen" />
  </div>
</template>

<script>
import CanvasResizer from './mixins/canvas_resizer';

function randomPastelColor() {
  const hue = 360 * Math.random();
  const saturation = 45 + 30 * Math.random();
  const lightness = 75 + 10 * Math.random();
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default {
  mixins: [CanvasResizer('screen', { redraw: true })],

  data() {
    return {
      lastPoint_: null,
    };
  },

  mounted() {
    const canvas = this.$refs.screen;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = randomPastelColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },

  methods: {
    onMouseMove_(event) {
      const x = event.clientX;
      const y = event.clientY;

      if (this.lastPoint_ != null) {
        const canvas = this.$refs.screen;
        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round';
        ctx.lineWidth = 200;
        ctx.beginPath();
        ctx.moveTo(devicePixelRatio * this.lastPoint_.x, devicePixelRatio * this.lastPoint_.y);
        ctx.lineTo(devicePixelRatio * x, devicePixelRatio * y);
        ctx.stroke();
      }

      this.lastPoint_ = { x, y };
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';
@import '@/src/scss/layout';

.Host {
  @include layout-center;
  @include layout-fill;

  background-image: url('./assets/background.svg');
  background-repeat: no-repeat;
  background-size: cover;
}

.Screen {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.Text {
  @include fonts-hero;

  text-align: center;
}
</style>
