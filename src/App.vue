<template>
  <router-view/>
</template>

<style lang="scss">
@import "@/styles/fonts";
@import "@/styles/layout";

* {
  color: inherit;
  font: inherit;
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
