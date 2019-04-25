<template>
  <div :class="$style.Host">
    <div>
      Not all who wander are lost... but you are. This page doesn't exist. Lets
      take you <router-link to="/">home</router-link>.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include fonts-body;
  @include layout-center;
  @include layout-fill;

  padding: 64px;
}
</style>
