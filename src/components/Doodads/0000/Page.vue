<template>
  <div :class="$style.Host" @click="loop_">
    <div>
      <div
        :class="$style.Cell"
        v-for="cell in cells_"
        :key="cell.key"
        :style="`background: ${cellRgb_(cell)};`"
      />
    </div>
  </div>
</template>

<script>
const CELL_WIDTH = 20;
const CELL_SPACING = 6;

function colorStrength(r, g, b) {
  const grayscale = (r + g + b) / 3;

  let strength = 0;
  strength += Math.abs(r - grayscale);
  strength += Math.abs(g - grayscale);
  strength += Math.abs(b - grayscale);
  strength = Math.min(Math.max(strength, 0), 1);

  // base vote
  strength += 0.2;
  strength /= 1.2;

  return strength;
}

function mutate(r, g, b) {
  return [
    Math.random() < 0.9999 ? r : Math.random(),
    Math.random() < 0.9999 ? g : Math.random(),
    Math.random() < 0.9999 ? b : Math.random(),
  ];
}

export default {
  data() {
    return {
      cells_: [],
      width_: 0,
      height_: 0,
    };
  },

  mounted() {
    window.addEventListener('resize', this.resize_);
    this.resize_();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize_);
  },

  methods: {
    cellRgb_(cell) {
      const r = Math.round(256 * cell.value[0]);
      const g = Math.round(256 * cell.value[1]);
      const b = Math.round(256 * cell.value[2]);
      return `rgb(${r}, ${g}, ${b})`;
    },

    neighbors_(y, x) {
      const neighbors = [];
      for (let dy = -1; dy <= 1; ++dy) {
        for (let dx = -1; dx <= 1; ++dx) {
          if (dy == 0 && dx == 0) continue;
          if (y + dy < 0) continue;
          if (y + dy >= this.height_) continue;
          if (x + dx < 0) continue;
          if (x + dx >= this.width_) continue;
          neighbors.push(this.cells_[this.width_ * (y + dy) + (x + dx)]);
        }
      }
      return neighbors;
    },

    resize_() {
      const width = this.$el.offsetWidth;
      const height = this.$el.offsetHeight;

      this.width_ = Math.floor((width - CELL_SPACING) / (CELL_WIDTH + CELL_SPACING));
      this.height_ = Math.floor((height - CELL_SPACING) / (CELL_WIDTH + CELL_SPACING));

      this.cells_ = [];
      for (let y = 0; y < this.height_; ++y) {
        for (let x = 0; x < this.width_; ++x) {
          this.cells_.push({
            key: `cell:${x},${y}`,
            value: [0.94, 0.94, 0.94],
          });
        }
      }

      for (let i = 0; i < 4; ++i) {
        const cell = this.cells_[Math.floor(Math.random() * this.cells_.length)];
        cell.value[0] = Math.random();
        cell.value[1] = Math.random();
        cell.value[2] = Math.random();
      }
    },

    loop_() {
      requestAnimationFrame(this.loop_);
      this.step_();
    },

    step_() {
      const newValues = [];

      for (let y = 0; y < this.height_; ++y) {
        for (let x = 0; x < this.width_; ++x) {
          const cell = this.cells_[y * this.width_ + x];
          const neighbors = this.neighbors_(y, x);

          const influencers = [cell, ...neighbors];

          const strengths = [];
          const strengthsTotal = 0;
          for (const influencer of influencers) {
            const strength = colorStrength(...influencer.value);
            strengths.push(strength);
            strengthsTotal += strength;
          }

          const votedStrength = Math.random() * strengthsTotal;
          const accumulator = 0;
          for (let i = 0; i < strengths.length; ++i) {
            accumulator += strengths[i];
            if (votedStrength <= accumulator) {
              newValues.push(mutate(...influencers[i].value));
              break;
            }
          }
        }
      }

      for (let i = 0; i < newValues.length; ++i) {
        this.cells_[i].value = newValues[i];
      }
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  @include layout-center;
  @include layout-fill;

  padding: 3px;
  text-align: center;
}

.Cell {
  display: inline-block;
  height: 20px;
  margin: 3px;
  width: 20px;
}
</style>
