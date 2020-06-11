<template>
  <div :class="$style.Host">
    <table>
      <tr>
        <td></td>
        <td><canvas ref="hue" @click="onHueClick_" /></td>
      </tr>
      <tr>
        <td>Cosine RGB</td>
        <td><canvas ref="cosineRGB" /></td>
      </tr>
      <tr>
        <td>Euclidean RGB</td>
        <td><canvas ref="euclideanRGB" /></td>
      </tr>
      <tr>
        <td>Cosine LAB</td>
        <td><canvas ref="cosineLAB" /></td>
      </tr>
      <tr>
        <td>Cosine CMYK</td>
        <td><canvas ref="cosineCMYK" /></td>
      </tr>
      <tr>
        <td>CIE76</td>
        <td><canvas ref="CIE76" /></td>
      </tr>
      <tr>
        <td>CIE94</td>
        <td><canvas ref="CIE94" /></td>
      </tr>
      <tr>
        <td>CIE00</td>
        <td><canvas ref="CIE00" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import ColorConvert from 'color-convert';
import DeltaE from 'delta-e';

function resizeCanvas(canvas) {
  canvas.width = devicePixelRatio * canvas.offsetWidth;
  canvas.height = devicePixelRatio * canvas.offsetHeight;
}

function renderHueStrip(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; ++x) {
    const normX = x / width;
    ctx.fillStyle = `hsl(${360 * normX}, 100%, 50%)`;
    ctx.fillRect(x, 0, x + 1, height);
  }
}

function cie76(lab1, lab2) {
  return (
    DeltaE.getDeltaE76(
      { L: lab1[0], A: lab1[1], B: lab1[2] },
      { L: lab2[0], A: lab2[1], B: lab2[2] }
    ) / 100
  );
}

function cie94(lab1, lab2) {
  return (
    DeltaE.getDeltaE94(
      { L: lab1[0], A: lab1[1], B: lab1[2] },
      { L: lab2[0], A: lab2[1], B: lab2[2] }
    ) / 100
  );
}

function cie00(lab1, lab2) {
  return (
    DeltaE.getDeltaE00(
      { L: lab1[0], A: lab1[1], B: lab1[2] },
      { L: lab2[0], A: lab2[1], B: lab2[2] }
    ) / 100
  );
}

// baseColor should be in HSL
function renderDistanceFunction(canvas, baseColor, distanceFunction, colorConversion) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; ++x) {
    const normX = x / width;
    const distance = distanceFunction(
      colorConversion(baseColor),
      colorConversion([360 * normX, 100, 50])
    );
    ctx.fillStyle = `hsl(0, 0%, ${100 * (1 - distance)}%)`;
    ctx.fillRect(x, 0, x + 1, height);
  }
}

export default {
  data() {
    return {
      baseHue_: null,
    };
  },

  mounted() {
    resizeCanvas(this.$refs.hue);
    resizeCanvas(this.$refs.cosineRGB);
    resizeCanvas(this.$refs.euclideanRGB);
    resizeCanvas(this.$refs.cosineLAB);
    resizeCanvas(this.$refs.cosineCMYK);
    resizeCanvas(this.$refs.CIE76);
    resizeCanvas(this.$refs.CIE94);
    resizeCanvas(this.$refs.CIE00);

    renderHueStrip(this.$refs.hue);

    this.baseHue_ = 0;
  },

  watch: {
    baseHue_() {
      renderDistanceFunction(
        this.$refs.cosineRGB,
        [this.baseHue_, 100, 50],
        (c1, c2) => {
          const c1_norm = Math.sqrt(Math.pow(c1[0], 2) + Math.pow(c1[1], 2) + Math.pow(c1[2], 2));
          const c2_norm = Math.sqrt(Math.pow(c2[0], 2) + Math.pow(c2[1], 2) + Math.pow(c2[2], 2));
          const dot = c1[0] * c2[0] + c1[1] * c2[1] + c1[2] * c2[2];
          const cos_alpha = dot / (c1_norm * c2_norm);
          return 1 - cos_alpha;
        },
        (color) => ColorConvert.hsl.rgb(color)
      );

      renderDistanceFunction(
        this.$refs.euclideanRGB,
        [this.baseHue_, 100, 50],
        (c1, c2) => {
          const normalizer = Math.sqrt(3 * Math.pow(255, 2));
          return (
            Math.sqrt(
              Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2)
            ) / normalizer
          );
        },
        (color) => ColorConvert.hsl.rgb(color)
      );

      renderDistanceFunction(
        this.$refs.cosineLAB,
        [this.baseHue_, 100, 50],
        (c1, c2) => {
          const c1_norm = Math.sqrt(Math.pow(c1[0], 2) + Math.pow(c1[1], 2) + Math.pow(c1[2], 2));
          const c2_norm = Math.sqrt(Math.pow(c2[0], 2) + Math.pow(c2[1], 2) + Math.pow(c2[2], 2));
          const dot = c1[0] * c2[0] + c1[1] * c2[1] + c1[2] * c2[2];
          const cos_alpha = dot / (c1_norm * c2_norm);
          return 1 - cos_alpha;
        },
        (color) => ColorConvert.hsl.lab(color)
      );

      renderDistanceFunction(
        this.$refs.cosineCMYK,
        [this.baseHue_, 100, 50],
        (c1, c2) => {
          const c1_norm = Math.sqrt(
            Math.pow(c1[0], 2) + Math.pow(c1[1], 2) + Math.pow(c1[2], 2) + Math.pow(c1[3], 2)
          );
          const c2_norm = Math.sqrt(
            Math.pow(c2[0], 2) + Math.pow(c2[1], 2) + Math.pow(c2[2], 2) + Math.pow(c2[3], 2)
          );
          const dot = c1[0] * c2[0] + c1[1] * c2[1] + c1[2] * c2[2] + c1[3] * c2[3];
          const cos_alpha = dot / (c1_norm * c2_norm);
          return 1 - cos_alpha;
        },
        (color) => ColorConvert.hsl.cmyk(color)
      );

      renderDistanceFunction(
        this.$refs.CIE76,
        [this.baseHue_, 100, 50],
        (c1, c2) => cie76(c1, c2),
        (color) => ColorConvert.hsl.lab(color)
      );

      renderDistanceFunction(
        this.$refs.CIE94,
        [this.baseHue_, 100, 50],
        (c1, c2) => cie94(c1, c2),
        (color) => ColorConvert.hsl.lab(color)
      );

      renderDistanceFunction(
        this.$refs.CIE00,
        [this.baseHue_, 100, 50],
        (c1, c2) => cie00(c1, c2),
        (color) => ColorConvert.hsl.lab(color)
      );
    },
  },

  methods: {
    onHueClick_(event) {
      const normX = event.layerX / this.$refs.hue.offsetWidth;
      this.baseHue_ = 360 * normX;
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';
@import '@/src/scss/layout';

.Host {
  @include layout-fill;

  background: #000;
  padding: 50px;

  & > table {
    border-spacing: 4px;

    td {
      @include fonts-navbar;

      color: #FFF;

      &:first-child {
        padding-right: 50px;
      }
    }
  }

  & canvas {
    background: #FFF;
    height: 20px;
    width: 300px;
  }
}
</style>
