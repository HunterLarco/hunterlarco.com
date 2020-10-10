<template>
  <div>
    <component :is="pageOne" :class="$style.Page_One" ref="pageOne" />
    <component :is="pageTwo" :class="$style.Page_Two" ref="pageTwo" />
  </div>
</template>

<script>
import LandingPage from '@/src/web/components/pages/Landing';
import Triplebyte2016Page from '@/src/web/components/pages/Triplebyte2016';

export default {
  data() {
    return {
      pageOne: LandingPage,
      pageTwo: Triplebyte2016Page,

      currentPage_: null,
      nextPage_: null,
    };
  },

  methods: {
    showForwards() {
      this.currentPage_.style.zIndex = 1;
      this.nextPage_.style.zIndex = 0;

      this.nextPage_.style.transition = null;
      this.nextPage_.style.transform = 'translate(50%)';

      setTimeout(() => {
        this.currentPage_.style.transition = 'transform 700ms ease-in-out';
        this.currentPage_.style.transform = 'translate(-100%)';
        this.nextPage_.style.transition = 'transform 700ms ease';
        this.nextPage_.style.transform = 'translate(0%)';

        const temp = this.currentPage_;
        this.currentPage_ = this.nextPage_;
        this.nextPage_ = temp;
      }, 50);
    },

    showBackwards() {
      this.currentPage_.style.zIndex = 1;
      this.nextPage_.style.zIndex = 0;

      this.nextPage_.style.transition = null;
      this.nextPage_.style.transform = 'translate(-50%)';

      setTimeout(() => {
        this.currentPage_.style.transition = 'transform 700ms ease-in-out';
        this.currentPage_.style.transform = 'translate(100%)';
        this.nextPage_.style.transition = 'transform 700ms ease';
        this.nextPage_.style.transform = 'translate(0%)';

        const temp = this.currentPage_;
        this.currentPage_ = this.nextPage_;
        this.nextPage_ = temp;
      }, 50);
    },
  },

  mounted() {
    const currentPage = this.$refs.pageOne.$el || this.$refs.pageOne;
    const nextPage = this.$refs.pageTwo.$el || this.$refs.pageTwo;

    this.currentPage_ = currentPage;
    this.currentPage_.style.zIndex = 1;
    this.nextPage_ = nextPage;
    this.nextPage_.style.zIndex = 0;
    this.nextPage_.style.transform = 'translateX(100%)';
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

<style module lang="sass">
@import '@/src/web/sass/layout';

@mixin _Page {
  @include layout-max-dimensions;

  left: 0;
  position: absolute;
  top: 0;
}

.Page_One {
  @include _Page;
}

.Page_Two {
  @include _Page;
}
</style>
