<template>
  <div :class="column ? $style.Host_Column : $style.Host">
    <div
      :class="[$style.Left, leftClass]"
      :style="`margin-right: ${spacing}px`"
    >
      <slot name="left"></slot>
    </div>

    <div :class="$style.Middle">
      <slot></slot>
    </div>

    <div
      :class="[$style.Right, rightClass]"
      :style="`margin-left: ${spacing}px`"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    spacing: {
      type: String,
      default: '0',
    },

    leftClass: {
      type: String,
      default: null,
    },

    rightClass: {
      type: String,
      default: null,
    },

    column: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/layout';

.Host {
  @include layout-horizontal;
}

.Host_Column {}

.Left {
  flex-shrink: 0;

  &:empty {
    display: none;
  }
}

.Middle {
  flex-grow: 1;
}

.Right {
  flex-shrink: 0;

  &:empty {
    display: none;
  }
}
</style>
