<template>
  <div :class="$style.Host">
    <div :class="$style.Fold">
      <div :class="$style.Role">Founder &amp; Engineer</div>
      <HunterLarco :class="$style.Hero" />
      <NavBar :class="$style.NavBar">
        <HackerText :class="$style.NavBar_Item" text="About" />
        <HackerText :class="$style.NavBar_Item" text="Work" />
        <HackerText :class="$style.NavBar_Item" text="Contact" />
      </NavBar>
    </div>
  </div>
</template>

<script>
import HackerText from '@/src/components/HackerText';
import HunterLarco from '@/src/components/HunterLarco';
import NavBar from '@/src/components/NavBar';

export default {
  components: { HackerText, HunterLarco, NavBar },
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
  cursor: pointer;
}
</style>
