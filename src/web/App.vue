<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
@import '@/src/web/sass/fonts';

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
