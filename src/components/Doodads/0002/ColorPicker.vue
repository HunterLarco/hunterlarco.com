<template>
  <div :class="$style.Host">
    <canvas :class="$style.Balance" ref="balance" @click="onClick_" />

    <div :class="$style.Summary">
      <div :class="$style.Preview" :style="`background: ${color.hex}`" />
      <div :class="$style.Sliders">
        <canvas :class="$style.Spread" ref="spread" @click="onSpreadClick_" />
      </div>
    </div>
  </div>
</template>

<script>
function rgbToHex({ r, g, b }) {
  const hexR = Math.round(r).toString(16).padStart(2, 0);
  const hexG = Math.round(g).toString(16).padStart(2, 0);
  const hexB = Math.round(b).toString(16).padStart(2, 0);
  return `#${hexR}${hexG}${hexB}`;
}

function hexToRgb(hex) {
  if (hex[0] == '#') hex = hex.substring(1);

  if (hex.length == 6) {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  } else if (hex.length == 3) {
    return {
      r: (parseInt(hex[0], 16) << 4) + parseInt(hex[0], 16),
      g: (parseInt(hex[1], 16) << 4) + parseInt(hex[1], 16),
      b: (parseInt(hex[2], 16) << 4) + parseInt(hex[2], 16),
    };
  }

  throw `Invalid hex color: ${hex}`;
}

function balanceCellColor(rgbColor, normX, normY) {
  return {
    r: (rgbColor.r + (255 - rgbColor.r) * (1 - normX)) * (1 - normY),
    g: (rgbColor.g + (255 - rgbColor.g) * (1 - normX)) * (1 - normY),
    b: (rgbColor.b + (255 - rgbColor.b) * (1 - normX)) * (1 - normY),
  };
}

function getSpreadColor(rgbColor) {
  let { r, g, b } = rgbColor;

  const lowerBound = Math.min(r, g, b);
  const upperBound = Math.max(r, g, b);

  if (lowerBound == upperBound) {
    return { r: 0, g: 94, b: 255 };
  }

  return {
    r: ((r - lowerBound) / (upperBound - lowerBound)) * 255,
    g: ((g - lowerBound) / (upperBound - lowerBound)) * 255,
    b: ((b - lowerBound) / (upperBound - lowerBound)) * 255,
  };
}

function renderColorBalance(canvas, rgbColor) {
  const width = devicePixelRatio * canvas.offsetWidth;
  const height = devicePixelRatio * canvas.offsetHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const cellColor = balanceCellColor(rgbColor, x / width, y / height);
      ctx.fillStyle = `rgb(${cellColor.r}, ${cellColor.g}, ${cellColor.b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function spreadCellColor(norm) {
  const b = 255 * Math.min(Math.max(0, 2 - Math.abs(6 * norm - 2)), 1);
  const g = 255 * Math.min(Math.max(0, 2 - Math.abs(6 * norm - 4)), 1);
  const r = 255 * Math.min(Math.max(0, Math.abs(6 * norm - 3) - 1), 1);
  return { r, g, b };
}

function renderSpread(canvas) {
  const width = devicePixelRatio * canvas.offsetWidth;
  const height = devicePixelRatio * canvas.offsetHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; ++x) {
    const { r, g, b } = spreadCellColor(x / width);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, 0, 1, height);
  }
}

export default {
  data() {
    return {
      color: {
        hex: '#627FB1',
        rgb: {
          r: 98,
          g: 127,
          b: 177,
        },
      },
    };
  },

  mounted() {
    renderColorBalance(this.$refs.balance, this.balanceRgbColor_);
    renderSpread(this.$refs.spread);
    this.$emit('color', this.color);
  },

  beforeDestroy() {},

  computed: {
    balanceRgbColor_() {
      return getSpreadColor(this.color.rgb);
    },
  },

  watch: {
    balanceRgbColor_() {
      if (this.$el) {
        renderColorBalance(this.$refs.balance, this.balanceRgbColor_);
      }
    },
  },

  methods: {
    onClick_(event) {
      const normX = event.layerX / event.target.offsetWidth;
      const normY = event.layerY / event.target.offsetHeight;
      this.color.rgb = balanceCellColor(this.balanceRgbColor_, normX, normY);
      this.color.hex = rgbToHex(this.color.rgb);
      this.$emit('color', this.color);
    },

    onSpreadClick_(event) {
      const normX = event.layerX / event.target.offsetWidth;
      const spreadColor = spreadCellColor(normX);
      this.color.rgb = spreadColor;
      this.color.hex = rgbToHex(this.color.rgb);
      this.$emit('color', this.color);
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  background: #FFF;
  border-radius: 2px;
  box-shadow: 0 5px 10px rgba(#000, 0.2);
  padding: 10px;
}

.Balance {
  background: #FFF;
  border-radius: 2px;
  height: 130px;
  margin-bottom: 10px;
  width: 200px;
}

.Summary {
  @include layout-horizontal;
}

.Preview {
  background: #000;
  border-radius: 2px;
  height: 30px;
  width: 30px;
}

.Sliders {
  margin-left: 10px;
}

.Spread {
  background: #000;
  border-radius: 2px;
  height: 10px;
  width: 160px;
}
</style>
