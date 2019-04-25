<template>
  <div :class="$style.Host">
    <img :class="$style.Preview" :src="preview" />
    <div :class="$style.Title">{{ project }}</div>
    <div :class="$style.Content">
      <slot></slot>
      <div :class="$style.Chips">
        <slot name="chip"></slot>
      </div>
    </div>
    <div :class="$style.ExpandTab"></div>
  </div>
</template>

<script>
export default {
  props: {
    project: String,
    preview: String,
  },
};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include layout-vertical;

  border-radius: 2px;
  border: 1px solid $colors-structure;
  display: inline-block;
  overflow: hidden;
  padding: 16px;
  position: relative;

  &:hover {
    border-color: colors-darken($colors-structure);
  }
}

.Preview {
  border-radius: 2px;
  flex-shrink: 0;
  margin-bottom: 16px;
  overflow: hidden;
  width: 100%;
}

.Title {
  @include fonts-strong-body;

  flex-shrink: 0;
}

.Content {
  @include fonts-body;

  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.ExpandTab {
  background: $colors-structure;
  box-shadow: 0 0 0 16px $colors-background;
  cursor: pointer;
  height: 85px;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%) rotate(45deg);
  transition: width 250ms, height 250ms;
  width: 85px;

  &:hover {
    height: 100px;
    width: 100px;

    &::after {
      transform: translate(-50%, -40%);
    }
  }

  &::after {
    @include fonts-interface;

    color: white;
    content: '\21A5';
    display: block;
    font-size: 25px;
    left: 50%;
    line-height: 25px;
    position: absolute;
    top: 75%;
    transform: translate(-50%, -50%);
    transition: transform 250ms;
  }
}

.Chips {
  @include fonts-clear;

  margin-top: 16px;
}

.Chips > * {
  @include fonts-interface;

  background: $colors-primary;
  border-radius: 1024px;
  color: $colors-primary-text !important;
  display: inline-block;
  margin: 2px;
  max-width: calc(100% - 20px);
  overflow: hidden;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[href] {
    cursor: pointer;

    &:hover {
      background: colors-darken($colors-primary);
    }
  }
}
</style>
