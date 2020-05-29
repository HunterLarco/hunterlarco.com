<template>
  <div :class="$style.Host">
    <div :class="$style.Text_Secondary">
      <div :class="$style.Camera_Secondary">Hunter.</div>
    </div>
    <div :class="$style.Text_Tertiary">
      <div :class="$style.Camera_Tertiary">Hunter.</div>
    </div>
    <div :class="$style.Text_Primary">
      <div :class="$style.Camera_Primary">Hunter.</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';

.Host {
  overflow: hidden;
  position: relative;
}

@mixin _text-base {
  @include fonts-hero;

  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.Text_Primary {
  @include _text-base;
}

.Text_Secondary {
  @include _text-base;
}

.Text_Tertiary {
  @include _text-base;
}

@mixin _camera-base {
}

.Camera_Primary {
  @include _camera-base;
}

.Camera_Secondary {
  @include _camera-base;

  color: #676767;
  transform: translate(-100px, -100px);
}

.Camera_Tertiary {
  @include _camera-base;

  color: #AFAFAF;
  transform: translate(100px, 100px);
}
</style>
