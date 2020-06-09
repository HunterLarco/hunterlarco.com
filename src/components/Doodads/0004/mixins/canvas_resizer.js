export default (ref, options) => ({
  methods: {
    [`resizeCanvas_${ref}_`]() {
      const canvas = this.$refs[ref];
      if (!canvas) {
        console.warn(`Cannot resize missing canvas: ${ref}`);
        return;
      }

      const ctx = canvas.getContext('2d');

      let stashedCanvas = null;
      if (options.redraw) {
        stashedCanvas = document.createElement('canvas');
        stashedCanvas.width = canvas.width;
        stashedCanvas.height = canvas.height;
        stashedCanvas.getContext('2d').drawImage(canvas, 0, 0);
      }

      canvas.width = devicePixelRatio * canvas.offsetWidth;
      canvas.height = devicePixelRatio * canvas.offsetHeight;

      if (stashedCanvas) {
        ctx.drawImage(stashedCanvas, 0, 0, canvas.width, canvas.height);
      }
    },
  },

  mounted() {
    this[`resizeCanvas_${ref}_`]();
    window.addEventListener('resize', this[`resizeCanvas_${ref}_`]);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this[`resizeCanvas_${ref}_`]);
  },
});
