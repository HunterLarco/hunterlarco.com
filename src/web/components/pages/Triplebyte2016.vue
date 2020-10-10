<template>
  <div :class="$style.Host">
    <router-link to="/">
      test
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';

.Host {
  @include fonts-body;

  background: cyan;

  & > * {
    display: block;
    width: 100px;
    height: 100px;
    background: red;
  }
}
</style>
