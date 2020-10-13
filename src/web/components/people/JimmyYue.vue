<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/JimmyYue.jpeg"
        />
      </template>

      <div :class="$style.Blurb">
        Building <span v-show="$sizing.gt(620)">a better internet</span> at
        <img
          :class="$style.BlurbImage_Mozilla"
          src="~@/src/web/assets/logos/Mozilla.png"
        />
      </div>
      <div :class="$style.Blurb">
        Founded
        <img
          :class="$style.BlurbImage_Terrace"
          src="~@/src/web/assets/logos/Terrace.png"
        />
      </div>
      <div :class="$style.Blurb">
        Senior Engineer at
        <img
          :class="$style.BlurbImage_LinkedIn"
          src="~@/src/web/assets/logos/LinkedIn.png"
        />
      </div>

      <div :class="$style.SocialIcons">
        <a
          :class="$style.SocialIcon"
          href="https://linkedin.com/in/jimmyyue"
          target="blank"
        >
          <img src="~@/src/web/assets/icons/LinkedIn.png" />
        </a>
        <a
          :class="$style.SocialIcon"
          href="https://github.com/JamStop"
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

.BlurbImage_Mozilla {
  height: 24px;
  margin-bottom: 2px;
  vertical-align: middle;
}

.BlurbImage_LinkedIn {
  height: 24px;
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
