<template>
  <div :class="$style.Host">
    <div :class="$style.Header">
      <router-link to="/">Hunter Larco</router-link>
    </div>

    <div :class="$style.Image">
      <img src="~@/src/web/assets/Triplebyte.png" />
    </div>

    <router-link :class="$style.CloseButton" to="/" />
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';

.Host {
  background: #2691C9;
  overflow-x: hidden;
  overflow-y: scroll;
}

.Header {
  @include fonts-name;

  color: #FFF;
  padding: 20px;
  text-align: center;

  & > a {
    color: inherit;
    text-decoration: none;
  }
}

.Image {
  padding: 40px 0;
  text-align: center;
}

.CloseButton {
  background-image: url('~@/src/web/assets/icons/FFF.png');
  background-repeat: no-repeat;
  background-size: 102px 748px;
  cursor: pointer;
  display: block;
  height: 51px;
  margin: 0 30px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 51px;

  &:hover {
    background-position: -51px 0;
  }
}
</style>
