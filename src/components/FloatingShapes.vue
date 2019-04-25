<template>
  <canvas :class="$style.Host" ref="canvas" />
</template>

<script>
import { CanvasMixin } from '@/util/CanvasMixin';

const PERIOD = 12000;
const RADIUS = 6;

// https://github.com/d3/d3-scale-chromatic d3.schemePastel2
const COLORS = [
  '#b3e2cd',
  '#fdcdac',
  '#cbd5e8',
  '#f4cae4',
  '#e6f5c9',
  '#fff2ae',
  '#f1e2cc',
  '#cccccc',
];

const ShapeRenderers = {
  /** Draws a circle of radius `r` */
  drawCircle(ctx, r) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fill();
  },

  /**
   * Draws a square with dimensions such that its area is equal to a circle
   * of radius `r`.
   */
  drawSquare(ctx, r) {
    const s_2 = (Math.sqrt(Math.PI) * r) / 2;

    ctx.beginPath();
    ctx.moveTo(-s_2, -s_2);
    ctx.lineTo(s_2, -s_2);
    ctx.lineTo(s_2, s_2);
    ctx.lineTo(-s_2, s_2);
    ctx.fill();
  },

  /**
   * Draws a triangle with dimensions such that its area is equal to a circle
   * of radius `r`.
   */
  drawTriangle(ctx, r) {
    const m = Math.sqrt((4 * Math.PI * Math.sqrt(3)) / 9) * r;
    const a = (2 * Math.PI) / 3;

    ctx.beginPath();
    ctx.moveTo(m, 0);
    ctx.lineTo(m * Math.cos(a), m * Math.sin(a));
    ctx.lineTo(m * Math.cos(2 * a), m * Math.sin(2 * a));
    ctx.fill();
  },
};

function randomRenderer() {
  const renderers = Object.values(ShapeRenderers);
  return renderers[Math.floor(Math.random() * renderers.length)];
}

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default {
  mixins: [CanvasMixin],

  data() {
    return {
      shapes: [],
    };
  },

  methods: {
    render(ctx, width, height) {
      const remainingShapes = [];
      for (const shape of this.shapes) {
        const ticker = (Date.now() - shape.startTime) / PERIOD;
        if (ticker > 1) continue;
        remainingShapes.push(shape);

        ctx.save();
        ctx.translate(
          shape.location,
          (this.el.height + 2 * RADIUS) * (1 - ticker)
        );
        ctx.rotate(
          shape.rotation + shape.rotationDirection * 2 * Math.PI * ticker
        );

        ctx.fillStyle = shape.color;
        ctx.globalAlpha = 1 - Math.pow(ticker, 2);
        shape.render(ctx, shape.radius);

        ctx.restore();
      }
      this.shapes = remainingShapes;

      const histogram = this.createBalancingHistogram();
      const locations = [];
      for (let i = 0; i < histogram.length; i++) {
        if (histogram[i] > 30) {
          locations.push(i);
        }
      }

      if (locations.length > 0) {
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        this.shapes.push({
          render: randomRenderer(),
          startTime: Date.now(),
          color: randomColor(),
          location: location,
          rotation: 2 * Math.PI * Math.random(),
          rotationDirection: Math.random() < 0.5 ? -1 : 1,
          radius: RADIUS,
        });
      }
    },

    createBalancingHistogram() {
      const histogram = Array(this.el.width);
      histogram.fill(Infinity);

      for (const { location, startTime } of this.shapes) {
        const ticker = (Date.now() - startTime) / PERIOD;
        const distance = (this.el.height + 2 * RADIUS) * ticker;
        const bucket = location;
        if (histogram[bucket] > distance) {
          histogram[bucket] = distance;
          let i = bucket + 1;
          while (histogram[i] > distance + Math.abs(i - bucket)) {
            histogram[i] = distance + Math.abs(i - bucket);
            i++;
          }
          i = bucket - 1;
          while (histogram[i] > distance + Math.abs(i - bucket)) {
            histogram[i] = distance + Math.abs(i - bucket);
            i--;
          }
        }
      }

      return histogram;
    },
  },
};
</script>

<style module lang="sass">
.Host {
  display: inline-block;
}
</style>
