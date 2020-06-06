<template>
  <div :class="$style.Host">
    <canvas :class="$style.Balance" ref="balance" @click="onClick_" />

    <div :class="$style.Summary">
      <div :class="$style.Preview" :style="`background: ${renderableColor_}`" />
      <div :class="$style.Sliders">
        <canvas :class="$style.Spread" ref="spread" @click="onSpreadClick_" />
      </div>
    </div>
  </div>
</template>

<script>
import ColorConvert from 'color-convert';

import { rgbToHex, hexToRgb, getHue } from './colors';

function xyToSL(normX, normY) {
  if (normX == 0 && normY == 1) {
    return { s: 0, l: 1 };
  } else if (normY - normX / 2 < 0.5) {
    return {
      s: normX,
      l: normY / (normX + 1),
    };
  } else {
    return {
      s: normX / (normX - 2 * normY + 2),
      l: normY - normX / 2,
    };
  }
}

function resizeCanvas(canvas) {
  const width = devicePixelRatio * canvas.offsetWidth;
  const height = devicePixelRatio * canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;
}

function renderHuePanel(canvas, hue) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(width, height);

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const normX = x / width;
      const normY = 1 - y / height;
      const { s, l } = xyToSL(normX, normY);
      const [r, g, b] = ColorConvert.hsl.rgb(360 * hue, 100 * s, 100 * l);

      const i = 4 * (x + y * width);
      imageData.data[i + 0] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function renderSpread(canvas) {
  const width = devicePixelRatio * canvas.offsetWidth;
  const height = devicePixelRatio * canvas.offsetHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; ++x) {
    const normX = x / width;
    ctx.fillStyle = `hsl(${360 * (1 - normX)}, 100%, 50%)`;
    ctx.fillRect(x, 0, 1, height);
  }
}

export default {
  data() {
    return {
      color_: {
        hue: 0.6055,
        saturation: 0.34,
        lightness: 0.54,
      },
    };
  },

  mounted() {
    resizeCanvas(this.$refs.balance);
    resizeCanvas(this.$refs.spread);

    renderHuePanel(this.$refs.balance, this.color_.hue);
    renderSpread(this.$refs.spread);
  },

  computed: {
    renderableColor_() {
      const { hue, saturation, lightness } = this.color_;
      return `hsl(${360 * hue}, ${100 * saturation}%, ${100 * lightness}%)`;
    },
  },

  watch: {
    'color_.hue'() {
      this.emitColor_();
      if (this.$el) {
        renderHuePanel(this.$refs.balance, this.color_.hue);
      }
    },

    'color_.saturation'() {
      this.emitColor_();
    },

    'color_.lightness'() {
      this.emitColor_();
    },
  },

  methods: {
    emitColor_() {
      this.$emit('change', this.renderableColor_);
    },

    onClick_(event) {
      const normX = event.layerX / event.target.offsetWidth;
      const normY = 1 - event.layerY / event.target.offsetHeight;
      const { s, l } = xyToSL(normX, normY);
      this.color_.saturation = s;
      this.color_.lightness = l;
    },

    onSpreadClick_(event) {
      const normX = event.layerX / event.target.offsetWidth;
      this.color_.hue = 1 - normX;
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
