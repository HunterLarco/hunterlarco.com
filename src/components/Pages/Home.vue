<template>
  <div :class="$style.Host">
    <div :class="$style.Fold">
      <div :class="$style.Role">Founder &amp; Engineer</div>
      <div :class="$style.Hero" />
      <NavBar :class="$style.NavBar">
        <div :class="$style.NavBar_Item">About</div>
        <div :class="$style.NavBar_Item">Work</div>
        <div :class="$style.NavBar_Item">Contact</div>
      </NavBar>
    </div>
  </div>
</template>

<script>
import NavBar from '@/src/components/NavBar';

export default {
  components: { NavBar },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';
@import '@/src/scss/layout';

.Host {
}

.Fold {
  @include layout-vertical;

  height: 100vh;
}

.Role {
  @include fonts-navbar;

  flex-shrink: 0;
  padding: 35px 100px;
}

.Hero {
  flex-grow: 1;
}

.NavBar {
  flex-shrink: 0;
  padding: 35px 100px;
}

.NavBar_Item {
}
</style>
