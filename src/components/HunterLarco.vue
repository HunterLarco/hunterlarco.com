<template>
  <div :class="$style.Host">
    <div :class="$style.Text_Secondary">
      <div :class="$style.Camera_Secondary" :style="cameras_.secondary.style">Artiste.</div>
    </div>
    <div :class="$style.Text_Tertiary">
      <div :class="$style.Camera_Tertiary" :style="cameras_.tertiary.style">Hunter.</div>
    </div>
    <div :class="$style.Text_Primary">
      <div :class="$style.Camera_Primary">Visionary.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cameras_: {
        secondary: {
          style: '',
        },
        tertiary: {
          style: '',
        },
      },
    };
  },

  methods: {
    mousemove_(event) {
      const { clientX: x, clientY: y } = event;
      const rx = x / window.innerWidth;
      const ry = y / window.innerHeight;
      const distance = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry - 1, 2));
      const range = Math.max(0.8 - distance, 0) / 0.8;

      const angle = Math.atan2(ry - 0.5, rx - 0.5);

      const offset = 100 + 150 * range;
      this.cameras_.secondary.style = `transform: translate(${offset * Math.cos(angle)}px, ${
        offset * Math.sin(angle)
      }px)`;
      this.cameras_.tertiary.style = `transform: translate(${-offset * Math.cos(angle)}px, ${
        -offset * Math.sin(angle)
      }px)`;
    },
  },

  mounted() {
    window.addEventListener('mousemove', this.mousemove_);
  },

  beforeDestroy() {
    window.removeEventListener('mousemove', this.mousemove_);
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';

.Host {
  overflow: hidden;
  position: relative;
}

@mixin _text-base {
  @include fonts-hero;

  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.Text_Primary {
  @include _text-base;
}

.Text_Secondary {
  @include _text-base;
}

.Text_Tertiary {
  @include _text-base;
}

@mixin _camera-base {
}

.Camera_Primary {
  @include _camera-base;
}

.Camera_Secondary {
  @include _camera-base;

  color: #676767;
  transform: translate(-100px, -100px);
}

.Camera_Tertiary {
  @include _camera-base;

  color: #AFAFAF;
  transform: translate(100px, 100px);
}
</style>
