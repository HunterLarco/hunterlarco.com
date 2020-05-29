<template>
  <div :class="$style.Host">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';

.Host {
  & > * {
    @include fonts-navbar;
  }
}
</style>
