<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/AmolKapoor.jpeg"
        />
      </template>

      <div :class="$style.Blurb">
        Machine Learning at
        <img
          :class="$style.BlurbImage_Google"
          src="~@/src/web/assets/logos/GoogleResearch.png"
        />
      </div>
      <div :class="$style.Blurb">
        Founded
        <img
          :class="$style.BlurbImage_MoLabs"
          src="~@/src/web/assets/logos/MoLabs.png"
        />
      </div>
      <div :class="$style.Blurb">
        Researcher at
        <img
          :class="$style.BlurbImage_BioNet"
          src="~@/src/web/assets/logos/BioNet.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/amolkapoor"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://github.com/theahura"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/Github.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://research.google/people/106318/"
          target="blank"
        >
          <img src="~@/src/web/assets/favicons/Google.svg" />
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

.BlurbImage_Google {
  height: 24px;
  vertical-align: middle;
}

.BlurbImage_BioNet {
  height: 20px;
  margin-bottom: 2px;
  vertical-align: middle;
}

.BlurbImage_MoLabs {
  height: 18px;
  margin-bottom: 4px;
  margin-left: 1px;
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
