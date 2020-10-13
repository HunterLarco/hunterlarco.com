<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/MikeKane.jpeg"
        />
      </template>

      <div :class="$style.Blurb">
        Machine Learning at
        <img
          :class="$style.BlurbImage_PerceptronConsulting"
          src="~@/src/web/assets/logos/PerceptronConsulting.png"
        />
      </div>
      <div :class="$style.Blurb">
        Senior Data Scientist at
        <img
          :class="$style.BlurbImage_Flatiron"
          src="~@/src/web/assets/logos/Flatiron.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/mikekane2"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://github.com/mike-kane"
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

.BlurbImage_Flatiron {
  height: 24px;
  margin-bottom: 10px;
  vertical-align: middle;
}

.BlurbImage_PerceptronConsulting {
  height: 20px;
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
