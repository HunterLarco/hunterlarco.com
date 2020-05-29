<template>
  <div :class="$style.Host">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style module lang="sass">
.Host {
}
</style>
