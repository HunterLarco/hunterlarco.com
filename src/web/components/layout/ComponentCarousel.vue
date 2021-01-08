<template>
  <div :class="$style.Host">
    <component
      :is="pageOne_.component"
      :class="$style.Page_One"
      :style="createStyleString_(pageOne_.style)"
    />
    <component
      :is="pageTwo_.component"
      :class="$style.Page_Two"
      :style="createStyleString_(pageTwo_.style)"
    />
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      pageOne_: {
        component: 'div',
        current: true,
        style: {},
      },

      pageTwo_: {
        component: 'div',
        current: false,
        style: {},
      },
    };
  },

  methods: {
    animateForwards(component) {
      const currentPage = this.pageOne_.current ? this.pageOne_ : this.pageTwo_;
      const nextPage = this.pageOne_.current ? this.pageTwo_ : this.pageOne_;

      nextPage.component = component;

      Vue.set(currentPage.style, 'z-index', 1);
      Vue.set(nextPage.style, 'z-index', 0);

      Vue.delete(nextPage.style, 'transition');
      Vue.set(nextPage.style, 'transform', 'translate(50%)');

      setTimeout(() => {
        Vue.set(currentPage.style, 'transition', 'transform 700ms ease-in-out');
        Vue.set(currentPage.style, 'transform', 'translate(-100%)');
        Vue.set(nextPage.style, 'transition', 'transform 700ms ease');
        Vue.set(nextPage.style, 'transform', 'translate(0%)');

        currentPage.current = false;
        nextPage.current = true;
      }, 50);
    },

    animateBackwards(component) {
      const currentPage = this.pageOne_.current ? this.pageOne_ : this.pageTwo_;
      const nextPage = this.pageOne_.current ? this.pageTwo_ : this.pageOne_;

      nextPage.component = component;

      Vue.set(currentPage.style, 'z-index', 0);
      Vue.set(nextPage.style, 'z-index', 1);

      Vue.delete(nextPage.style, 'transition');
      Vue.set(nextPage.style, 'transform', 'translate(-100%)');

      setTimeout(() => {
        Vue.set(currentPage.style, 'transition', 'transform 700ms ease-in-out');
        Vue.set(currentPage.style, 'transform', 'translate(50%)');
        Vue.set(nextPage.style, 'transition', 'transform 700ms ease');
        Vue.set(nextPage.style, 'transform', 'translate(0%)');

        currentPage.current = false;
        nextPage.current = true;
      }, 50);
    },

    show(component) {
      const currentPage = this.pageOne_.current ? this.pageOne_ : this.pageTwo_;
      currentPage.component = component;
    },

    createStyleString_(styleMap) {
      return Object.entries(styleMap)
        .map(([key, value]) => `${key}:${value}`)
        .join(';');
    },
  },

  mounted() {
    Vue.set(this.pageOne_.style, 'z-index', 1);
    Vue.set(this.pageTwo_.style, 'z-index', 0);
    Vue.set(this.pageTwo_.style, 'transform', 'translateX(100%)');
  },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/layout';

.Host {
  @include layout-max-dimensions;

  overflow: hidden;
  position: relative;
}

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
