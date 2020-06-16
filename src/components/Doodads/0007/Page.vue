<template>
  <div :class="$style.Host">
    <div :class="$style.Doodads">
      <div :class="$style.Doodad">0x0000</div>
      <div :class="$style.Doodad">0x0001</div>
      <div :class="$style.Doodad">0x0002</div>
      <div :class="$style.Doodad">0x0003</div>
      <div :class="$style.Doodad">0x0004</div>
      <div :class="$style.Doodad">0x0005</div>
      <div :class="$style.Doodad">0x0006</div>
      <div :class="$style.Doodad">0x0007</div>
      <div :class="$style.Doodad">0x0000</div>
      <div :class="$style.Doodad">0x0001</div>
      <div :class="$style.Doodad">0x0002</div>
      <div :class="$style.Doodad">0x0003</div>
      <div :class="$style.Doodad">0x0004</div>
      <div :class="$style.Doodad">0x0005</div>
      <div :class="$style.Doodad">0x0006</div>
      <div :class="$style.Doodad">0x0007</div>
      <div :class="$style.Doodad">0x0000</div>
      <div :class="$style.Doodad">0x0001</div>
      <div :class="$style.Doodad">0x0002</div>
      <div :class="$style.Doodad">0x0003</div>
      <div :class="$style.Doodad">0x0004</div>
      <div :class="$style.Doodad">0x0005</div>
      <div :class="$style.Doodad">0x0006</div>
      <div :class="$style.Doodad">0x0007</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';
@import '@/src/scss/layout';

@mixin _fonts-doodad-0007 {
  @include _fonts-base;

  font-family: 'Proxima Nova Bold', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
}

.Host {
  padding: 100px;
}

.Doodads {
  @include _fonts-doodad-0007;

  margin: 0 auto;
  max-width: 600px;
}

.Doodad {
  cursor: pointer;
  display: inline-block;
  margin: 25px 10px;
}
</style>
