<template>
  <div :class="$style.Host" @click="play_">
    <canvas :class="$style.Canvas" ref="canvas" />
  </div>
</template>

<script>
import Amaterasu from '@/src/web/assets/labs/fft/amaterasu.mp3';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const source = audioCtx.createBufferSource();

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 1;

export default {
  mounted() {
    this.resize_();
    this.configure_();
  },

  methods: {
    async configure_() {
      const response = await fetch(Amaterasu);
      const buffer = await response.arrayBuffer();

      source.buffer = await audioCtx.decodeAudioData(buffer);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    },

    resize_() {
      const canvas = this.$refs.canvas;

      const width = canvas.offsetWidth * window.devicePixelRatio;
      const height = canvas.offsetHeight * window.devicePixelRatio;

      canvas.width = width;
      canvas.height = height;
    },

    play_() {
      source.start();

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        requestAnimationFrame(loop);

        const canvas = this.$refs.canvas;
        const width = canvas.width;
        const height = canvas.height;

        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, width, height);

        analyser.getByteTimeDomainData(dataArray);

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let i = 0; i < dataArray.length; ++i) {
          const value = dataArray[i];
          ctx.lineTo(
            ((i / dataArray.length) * width) / 2,
            (value / 256) * height
          );
        }
        for (let i = 0; i < dataArray.length; ++i) {
          const value = dataArray[dataArray.length - i - 1];
          ctx.lineTo(
            width / 2 + ((i / dataArray.length) * width) / 2,
            (value / 256) * height
          );
        }
        ctx.stroke();
      };

      loop();
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/layout';

.Host {
  @include layout-fill;
}

.Canvas {
  @include layout-max-dimensions;
}
</style>
