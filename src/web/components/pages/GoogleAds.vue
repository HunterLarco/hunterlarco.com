<template>
  <div :class="$style.Host">
    <HorizontalLayout :class="$style.Nav">
      <template v-slot:left>
        <router-link :class="$style.NavItem" to="/history/make-school">
          <img
            src="~@/src/web/assets/icons/Chevron.svg"
            style="transform: scale(-1, 1);"
          />
          <label>Make School</label>
        </router-link>
      </template>

      <template v-slot:right>
        <router-link :class="$style.NavItem" to="/history/google-research">
          <label>Google Research</label>
          <img src="~@/src/web/assets/icons/Chevron.svg" />
        </router-link>
      </template>
    </HorizontalLayout>

    <VerticalRibbon max-width="800px" centered :class="$style.Content">
      <img :class="$style.Logo" src="~@/src/web/assets/logos/GoogleAds.png" />

      <div :class="$style.Title">
        I consider my time at Google as my "college experience." I spend ~1.5
        years there before co-fouding a team within
        <router-link to="/history/google-research">Google Research</router-link
        >. In that time I met several incredible engineers who still inspire me.
        Most notably,
        <a href="https://www.linkedin.com/in/milnivlek/" target="blank"
          >Kelvin Lim</a
        >.
      </div>
    </VerticalRibbon>
  </div>
</template>

<script>
import HorizontalLayout from '@/src/web/components/layout/HorizontalLayout';
import VerticalRibbon from '@/src/web/components/layout/VerticalRibbon';

export default {
  components: { HorizontalLayout, VerticalRibbon },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';
@import '@/src/web/sass/layout';
@import '@/src/web/sass/sizing';

.Host {
  @include layout-fill;

  overflow-x: hidden;
  overflow-y: scroll;
}

.Nav {
  padding: 20px;
}

.NavItem {
  color: inherit;
  cursor: pointer;
  display: inline-block;
  opacity: 0.4;
  text-decoration: none;

  & > label {
    @include fonts-body;

    cursor: inherit;
    margin: 0 12px;
    vertical-align: middle;
  }

  & > img {
    height: 20px;
    vertical-align: middle;
  }

  &:hover > label {
    text-decoration: underline;
  }
}

.Content {
  padding: 60px;

  & a {
    color: #E71A8B;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @include sizing-mobile {
    padding: 30px;
  }
}

.Title {
  @include fonts-name;

  margin: 40px 0;
}

.Logo {
  height: 40px;
  vertical-align: middle;
}
</style>
