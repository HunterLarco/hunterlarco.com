<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/LukeSolomon.jpeg"
        />
      </template>

      <div :class="$style.Blurb">
        Senior iOS Engineer at
        <img
          :class="$style.BlurbImage_Yelp"
          src="~@/src/web/assets/logos/Yelp.png"
        />
      </div>
      <div :class="$style.Blurb">
        iOS Engineer at
        <img
          :class="$style.BlurbImage_Epic"
          src="~@/src/web/assets/logos/Epic.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/luke-solomon-7b846375"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://github.com/ares42"
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

.BlurbImage_Terrace {
  height: 20px;
  margin-bottom: 6px;
  vertical-align: middle;
}

.BlurbImage_Yelp {
  height: 30px;
  margin-bottom: 9px;
  vertical-align: middle;
}

.BlurbImage_Epic {
  height: 22px;
  margin-bottom: 4px;
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
