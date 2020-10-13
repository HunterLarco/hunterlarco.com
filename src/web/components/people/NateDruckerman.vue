<template>
  <div :class="$style.Host">
    <HorizontalLayout spacing="20">
      <template v-slot:left>
        <img
          :class="$style.ProfileImage"
          src="~@/src/web/assets/people/NateDruckerman.png"
        />
      </template>

      <div :class="$style.Blurb">
        Senior Engineer at
        <img
          :class="$style.BlurbImage_YouTube"
          src="~@/src/web/assets/logos/YouTube.png"
        />
      </div>
      <div :class="$style.Blurb">
        Senior Engineer at
        <img
          :class="$style.BlurbImage_Google"
          src="~@/src/web/assets/logos/GoogleAds.png"
        />
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

.BlurbImage_YouTube {
  height: 20px;
  margin-bottom: 2px;
  margin-left: 1px;
  vertical-align: middle;
}
</style>
