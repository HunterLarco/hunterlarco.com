<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/AustinDiamond.png"
        />
      </template>

      <div :class="$style.Blurb">
        VP at
        <img
          :class="$style.BlurbImage_LongevityFund"
          src="~@/src/web/assets/logos/LongevityFund.png"
        />
      </div>
      <div :class="$style.Blurb">
        Growth at
        <img
          :class="$style.BlurbImage_Omni"
          src="~@/src/web/assets/logos/Omni.png"
        />
      </div>
      <div :class="$style.Blurb">
        Business development at
        <img
          :class="$style.BlurbImage_Partnered"
          src="~@/src/web/assets/logos/Partnered.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/austindiamond"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
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

.BlurbImage_LongevityFund {
  height: 18px;
  margin-bottom: 4px;
  vertical-align: middle;
}

.BlurbImage_Omni {
  height: 24px;
  vertical-align: middle;
}

.BlurbImage_Partnered {
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
