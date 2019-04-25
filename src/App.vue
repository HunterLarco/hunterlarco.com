<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';

* {
  font-size: inherit;
  margin: 0;
  padding: 0;
}

html {
  @include fonts-clear;
}

[hidden] {
  display: none !important;
}

a {
  color: $colors-primary;
  text-decoration: none !important;

  &:hover {
    color: colors-darken($colors-primary);
  }
}
</style>
