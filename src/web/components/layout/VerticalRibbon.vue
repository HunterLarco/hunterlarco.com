<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: '100%',
    },

    centered: {
      type: Boolean,
      default: false,
    },

    padding: {
      type: String,
      default: null,
    },
  },

  render(createElement) {
    const style = { maxWidth: this.maxWidth };

    if (this.centered) {
      style.marginLeft = 'auto';
      style.marginRight = 'auto';
    }

    if (this.padding) {
      style.padding = this.padding;
    }

    return createElement('div', { style }, this.$slots.default);
  },
};
</script>
