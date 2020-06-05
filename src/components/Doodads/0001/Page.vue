<template>
  <div :class="$style.Host">
    <canvas
      ref="colors"
      width="800"
      height="800"
      @mousedown="onMouseDown_"
      @mouseup="onMouseUp_"
      @mousemove="onMouseMove_"
    />
    <canvas ref="cos_distance" width="800" height="800" />
    <canvas ref="euc_distance" width="800" height="800" />
  </div>
</template>

<script>
function colorDistance(c1, c2) {
  const c1_norm = Math.sqrt(Math.pow(c1[0], 2) + Math.pow(c1[1], 2) + Math.pow(c1[2], 2));
  const c2_norm = Math.sqrt(Math.pow(c2[0], 2) + Math.pow(c2[1], 2) + Math.pow(c2[2], 2));
  const dot = c1[0] * c2[0] + c1[1] * c2[1] + c1[2] * c2[2];
  const cos_alpha = dot / (c1_norm * c2_norm);
  return cos_alpha;
}

function colorEucDistance(c1, c2) {
  return (
    1 -
    Math.sqrt(
      Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2)
    ) /
      Math.sqrt(3 * Math.pow(255, 2))
  );
}

function colorForWheelAngle(radians) {
  const p = radians / (2 * Math.PI);
  const norm_p = p - Math.floor(p);
  const r = 255 * Math.max(0, 1 - Math.abs(3 * norm_p - 1));
  const g = 255 * Math.max(0, 1 - Math.abs(3 * norm_p - 2));
  const b = 255 * Math.max(0, Math.abs(3 * norm_p - 1.5) - 0.5);
  return [r, g, b];
}

function renderColorWheel(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) / 2;

  ctx.clearRect(0, 0, width, height);

  for (let deg = 0; deg < 360; ++deg) {
    const color = colorForWheelAngle((deg / 180) * Math.PI);
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(width / 2, height / 2, radius, (Math.PI / 180) * deg, (Math.PI / 180) * (deg + 1));
    ctx.fill();
  }
}

function renderDistances(canvas, distance_fn) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) / 2;

  ctx.clearRect(0, 0, width, height);

  for (let deg = 0; deg < 360; ++deg) {
    const color = colorForWheelAngle((deg / 180) * Math.PI);
    const distance = distance_fn(color);

    ctx.fillStyle = `rgb(${255 * distance}, ${255 * distance}, ${255 * distance})`;

    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(width / 2, height / 2, radius, (Math.PI / 180) * deg, (Math.PI / 180) * (deg + 1));
    ctx.fill();
  }
}

export default {
  data() {
    return {
      mouse_: { down: false },
      color_: [255, 255, 255],
    };
  },

  mounted() {
    renderColorWheel(this.$refs.colors);
    renderDistances(this.$refs.cos_distance, (color) => colorDistance(this.color_, color));
    renderDistances(this.$refs.euc_distance, (color) => colorEucDistance(this.color_, color));
  },

  methods: {
    selectColor_(x, y) {
      const width = this.$refs.colors.offsetWidth;
      const height = this.$refs.colors.offsetHeight;
      const angle = Math.atan2(y - height / 2, x - width / 2);
      this.color_ = colorForWheelAngle(angle);
      renderDistances(this.$refs.cos_distance, (color) => colorDistance(this.color_, color));
      renderDistances(this.$refs.euc_distance, (color) => colorEucDistance(this.color_, color));
    },

    onMouseDown_(event) {
      this.mouse_.down = true;
      this.selectColor_(event.layerX, event.layerY);
    },

    onMouseMove_(event) {
      if (!this.mouse_.down) return;
      this.selectColor_(event.layerX, event.layerY);
    },

    onMouseUp_(event) {
      this.mouse_.down = false;
      this.selectColor_(event.layerX, event.layerY);
    },
  },
};
</script>

<style module lang="sass">
.Host {
  canvas {
    height: 400px;
    width: 400px;
  }
}
</style>
