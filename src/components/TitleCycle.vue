<template>
  <div :class="$style.Host">{{ role }}</div>
</template>

<script>
import * as shuffle from 'shuffle-array';

const TITLES = [
  'Founder',
  'Engineer',
  'Builder',
  'Academic',
  'Hacker',
  'Philosopher',
  'Thinker',
  'Do-er',
  'Entrepreneur',
  'Maker',
  'Ninja',
  'Onewheel-er',
];

export default {
  data() {
    return {
      role: shuffle.pick(TITLES, { picks: 2 }).join(' & '),
    };
  },
};
</script>

<style module lang="sass">
.Host {
}
</style>
