<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/WillGowell.jpeg"
        />
      </template>

      <div :class="$style.Blurb">
        Security Engineer at
        <img
          :class="$style.BlurbImage_Twitch"
          src="~@/src/web/assets/logos/Twitch.png"
        />
      </div>
      <div :class="$style.Blurb">
        SRE at
        <img
          :class="$style.BlurbImage_GeneralElectric"
          src="~@/src/web/assets/logos/GeneralElectric.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/william-gowell-63094b68"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://github.com/thiswillgowell"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/Github.png" />
        </a>
      </div>
    </HorizontalLayout>
  </div>
</template>

<script>
import HorizontalLayout from '@/src/web/components/layout/HorizontalLayout';

export default {
  components: { HorizontalLayout },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';

.Host {
}

.ProfileImage {
  height: 100px;
  border-radius: 50%;
}

.Blurb {
  @include fonts-blurb;

  margin-top: 5px;
}

.BlurbImage_Twitch {
  height: 24px;
  vertical-align: middle;
}

.BlurbImage_GeneralElectric {
  height: 24px;
  vertical-align: middle;
}

.SocialIcons {
  margin-top: 10px;
}

.SocialIcon {
  & > img {
    height: 24px;
    margin-bottom: 4px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
</style>
