<template>
  <ComponentCarousel ref="carousel" />
</template>

<script>
import ComponentCarousel from '@/src/web/components/layout/ComponentCarousel';
import LandingPage from '@/src/web/components/pages/Landing';
import Triplebyte2016Page from '@/src/web/components/pages/Triplebyte2016';

const pageMap = {
  '/': LandingPage,
  '/triplebyte-certificate-2016': Triplebyte2016Page,
};

export default {
  components: { ComponentCarousel },

  data() {
    return {
      didFirstRender_: false,
    };
  },

  watch: {
    $route(to, from) {
      const page = pageMap[to.path];

      if (!this.didFirstRender_) {
        this.$refs.carousel.show(page);
        this.didFirstRender_ = true;
      } else if (to.path == '/') {
        this.$refs.carousel.animateBackwards(page);
      } else {
        this.$refs.carousel.animateForwards(page);
      }
    },
  },
};
</script>

<style lang="sass">
@import '@/src/web/sass/fonts';

* {
  font-size: inherit;
  margin: 0;
  padding: 0;
}

html body {
  @include fonts-clear;
}

[hidden] {
  display: none !important;
}
</style>
