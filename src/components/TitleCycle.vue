<template>
  <div :class="$style.Host">
    <div :class="$style.Role_Primary" v-for="role in roles_.primary" :key="role">{{ role }}</div>
    <div :class="$style.Role_Secondary" v-for="role in roles_.secondary" :key="role">
      {{ role }}
    </div>
  </div>
</template>

<script>
import shuffle from 'shuffle-array';

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
  'Self taught',
];

export default {
  data() {
    const titles = shuffle(TITLES);
    return {
      roles_: {
        primary: titles.slice(0, 2),
        secondary: titles.slice(2),
      },
    };
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';

.Host {

  cursor: pointer;
  display: inline-block;
  max-width: 400px;


  &:after {
    content: '+';
    display: inline-block;
    margin-left: 0.4em;
    position: relative;
    top: -1px;
  }
}

@mixin _role-base {
  @include fonts-navbar;

  display: inline-block;
  white-space: nowrap;

  &:not(:last-child):after {
    content: '\00a0&\00a0',
  }
}

.Role_Primary {
  @include _role-base;
}

.Role_Secondary {
  @include _role-base;

  color: #AFAFAF;
}
</style>
