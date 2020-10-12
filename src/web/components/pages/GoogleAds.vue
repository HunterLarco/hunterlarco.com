<template>
  <div :class="$style.Host"></div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/web/sass/layout';

.Host {
  @include layout-fill;

  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
