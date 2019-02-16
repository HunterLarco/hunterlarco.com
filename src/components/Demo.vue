<template>
<div :class='$style.Red'>Hello World</div>
</template>

<script>
export default {
  name: 'Demo',
}
</script>

<style module lang='sass'>
.Red {
  @include layout-fill;
  @include fonts-body;

  color: $colors-red;
}
</style>
