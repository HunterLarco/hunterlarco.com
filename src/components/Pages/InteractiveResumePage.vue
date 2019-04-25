<template>
  <div :class="$style.Host">
    Languages C++ (11+) Python (2.7, 3.0+) JS (ES5, ES6) Java (7, 8) -- GLSL SQL
    Bash Skylark Protocol Buffer Frameworks VueJS Polymer Bazel OpenCV d3.js
    THREE.js Guava abseil Tensorflow Tools Webpack Babel Persistance Spanner
    BigTable Datastore Blobstore MongoDB PostgreSQL Platforms GCP AppEngine
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include fonts-body;
  @include layout-fill;

  margin: 128px;
}
</style>
