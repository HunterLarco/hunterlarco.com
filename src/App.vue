<template>
  <div :class="$style.Host"></div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  @include layout-fill;
}
</style>

<style lang="sass">
@import '@/src/scss/fonts';
@import '@/src/scss/layout';

* {
  font-size: inherit;
  margin: 0;
  padding: 0;
}

html body {
  @include fonts-clear;
}

[hidden] {
  display: none !important;
}
</style>
