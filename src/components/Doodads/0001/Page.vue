<template>
  <div :class="$style.Host">
    <canvas
      ref="colors"
      width="800"
      height="800"
      @mouseup="onMouseUp_"
      @mousemove="onMouseMove_"
      @mousedown="onMouseDown_"
    />
    <canvas ref="cos_distance" width="800" height="800" />
    <canvas ref="euc_distance" width="800" height="800" />

    <dat-gui>
      <dat-color v-model="color_.hex" label="Color" />
    </dat-gui>
  </div>
</template>

<script>
import ColorConvert from 'color-convert';

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
  return ColorConvert.hsl.rgb(360 * (1 - radians / (2 * Math.PI)), 100, 50);
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

function decomposeHexColor(color) {
  if (color[0] == '#') color = color.substring(1);

  if (color.length == 6) {
    return [
      parseInt(color.substring(0, 2), 16),
      parseInt(color.substring(2, 4), 16),
      parseInt(color.substring(4, 6), 16),
    ];
  } else if (color.length == 3) {
    return [
      (parseInt(color[0], 16) << 4) + parseInt(color[0], 16),
      (parseInt(color[1], 16) << 4) + parseInt(color[1], 16),
      (parseInt(color[2], 16) << 4) + parseInt(color[2], 16),
    ];
  }

  throw `Unexpected color ${color}`;
}

export default {
  data() {
    return {
      mouse_: { down: false },
      color_: { hex: '#FFFFFF' },
    };
  },

  mounted() {
    renderColorWheel(this.$refs.colors);
    this.renderAllDistances_();
  },

  methods: {
    renderAllDistances_() {
      renderDistances(this.$refs.cos_distance, (color) =>
        colorDistance(decomposeHexColor(this.color_.hex), color)
      );
      renderDistances(this.$refs.euc_distance, (color) =>
        colorEucDistance(decomposeHexColor(this.color_.hex), color)
      );
    },

    selectColor_(x, y) {
      const width = this.$refs.colors.offsetWidth;
      const height = this.$refs.colors.offsetHeight;
      const angle = Math.atan2(y - height / 2, x - width / 2);
      const color = colorForWheelAngle(angle);
      this.color_.hex =
        '#' +
        color[0].toString(16).padStart(2, 0) +
        color[1].toString(16).padStart(2, 0) +
        color[2].toString(16).padStart(2, 0);
      console.log(this.color_.hex);
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

  watch: {
    'color_.hex'() {
      this.renderAllDistances_();
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
