<template>
  <div :class="$style.Host" :style="`background: ${hexColor_}`">
    <ColorPicker @color="hexColor_ = $event.hex" />
  </div>
</template>

<script>
import ColorPicker from '@/src/components/Doodads/0002/ColorPicker';

export default {
  components: { ColorPicker },

  data() {
    return {
      hexColor_: null,
    };
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  @include layout-center;
  @include layout-fill;

  background: #627FB1;
}
</style>
