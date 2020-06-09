<template>
  <div :class="$style.Host">
    <div>
      <CodeFont text="from google.appengine.ext import ndb" :class="$style.CodeFont" />
    </div>
  </div>
</template>

<script>
import CodeFont from './CodeFont';

export default {
  components: { CodeFont },
};
</script>

<style module lang="sass">
@import '@/src/scss/layout';

.Host {
  @include layout-fill;
  @include layout-center;

  background: #000;
  color: #FFF;
}

.CodeFont {
  padding: 30px;
}
</style>
