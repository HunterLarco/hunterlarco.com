<template>
  <div :class="[$style.Host, { [$style.Host__Compressed]: el.is.small }]">
    <img :class="$style.Icon" :src="icon" :hidden="el.is.small" />
    <div :class="$style.Text">
      <div :class="$style.Title">{{ organization }}</div>
      <div :class="$style.Project">{{ project }}</div>
      <div :class="$style.Details">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ResponsiveMixin } from '@/util/ResponsiveMixin';

export default {
  props: {
    organization: String,
    project: String,
    icon: String,
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: (width) => width <= 500,
  },
};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include layout-horizontal;

  padding: 16px;
}

.Host__Compressed {
  padding: 8px;
}

.Icon {
  display: block;
  flex-shrink: 0;
  height: 48px;
  margin-right: 16px;
  margin-top: 4px;
  width: 48px;
}

.Text {
  flex-grow: 1;
}

.Title {
  @include fonts-caption;
}

.Project {
  @include fonts-strong-body;
}

.Details {
  @include fonts-body;
}
</style>
