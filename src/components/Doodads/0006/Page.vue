<template>
  <div :class="$style.Host">
    <div :class="$style.xAxis">
      <canvas ref="xAxis" />
    </div>
    <div :class="$style.Body">
      <div :class="$style.yAxis">
        <canvas ref="yAxis" />
      </div>
      <div :class="$style.Graph">
        <canvas ref="graph" />
      </div>
    </div>
  </div>
</template>

<script>
import ColorConvert from 'color-convert';
import DeltaE from 'delta-e';

function resizeCanvas(canvas) {
  canvas.style.width = `${canvas.offsetWidth}px`;
  canvas.style.height = `${canvas.offsetHeight}px`;
  canvas.width = devicePixelRatio * canvas.offsetWidth;
  canvas.height = devicePixelRatio * canvas.offsetHeight;
}

function renderXAxis(canvas) {
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

function renderYAxis(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; ++y) {
    const normX = y / height;
    ctx.fillStyle = `hsl(${360 * normX}, 100%, 50%)`;
    ctx.fillRect(0, y, width, y + 1);
  }
}

function renderGraph(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const image = ctx.createImageData(width, height);

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const normX = x / width;
      const normY = y / height;

      const colorX = [360 * normX, 100, 50];
      const colorY = [360 * normY, 100, 50];

      const labX = ColorConvert.hsl.lab(colorX);
      const labY = ColorConvert.hsl.lab(colorY);
      const normDistance =
        DeltaE.getDeltaE94(
          { L: labX[0], A: labX[1], B: labX[2] },
          { L: labY[0], A: labY[1], B: labY[2] }
        ) / 100;

      const i = 4 * (y * width + x);
      const renderColor = ColorConvert.gray.rgb(100 * (1 - normDistance));
      image.data[i + 0] = renderColor[0];
      image.data[i + 1] = renderColor[1];
      image.data[i + 2] = renderColor[2];
      image.data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
}

export default {
  mounted() {
    resizeCanvas(this.$refs.xAxis);
    resizeCanvas(this.$refs.yAxis);
    resizeCanvas(this.$refs.graph);

    renderXAxis(this.$refs.xAxis);
    renderYAxis(this.$refs.yAxis);
    renderGraph(this.$refs.graph);
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  display: inline-block;
  margin: 100px;

  canvas {
    height: 100%;
    width: 100%;
  }
}

.Body {
  @include layout-horizontal;
}

.xAxis {
  height: 20px;
  margin-left: 20px;
  width: 600px;
}

.yAxis {
  flex-shrink: 0;
  height: 600px;
  width: 20px;
}

.Graph {
  flex-grow: 1;
}
</style>
