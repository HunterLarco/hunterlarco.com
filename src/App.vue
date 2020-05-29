<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

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
