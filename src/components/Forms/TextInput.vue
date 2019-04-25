<template>
  <input :class="$style.Host" :placeholder="placeholder" />
</template>

<script>
export default {
  props: {
    placeholder: String,
  },
};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';

.Host {
  @include fonts-interface;

  border-radius: 512px;
  border: 1px solid $colors-structure;
  display: inline-block;
  margin: 0;
  min-width: 200px;
  outline: none !important;
  padding: 8px 16px;

  &::placeholder {
    color: $colors-lite-text;
  }

  &:hover {
    border-color: colors-darken($colors-structure);
  }

  &:focus {
    border-color: $colors-primary !important;
  }
}
</style>
