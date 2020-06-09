<template>
  <div :class="$style.Host" @mouseenter="onMouseEnter_" @mouseleave="onMouseLeave_">
    {{ renderText_ }}
  </div>
</template>

<script>
import shuffle from 'shuffle-array';

const kRandomChars = [
  'abcdefghijklmnopqrstuvwxyz',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  '0123456789',
  '_-+=*#@$&!~/\\|:',
].flatMap((chars) => chars.split(''));

function replaceCharAt(text, index, replacement) {
  return text.substring(0, index) + replacement + text.substring(index + 1);
}

function replaceRandomChar(text) {
  const randomCharIndex = Math.floor(Math.random() * text.length);
  const randomChar = kRandomChars[Math.floor(Math.random() * kRandomChars.length)];
  return replaceCharAt(text, randomCharIndex, randomChar);
}

export default {
  props: {
    text: {
      type: String,
      required: true,
    },

    onHover: Boolean,
  },

  data() {
    return {
      renderText_: '',
      mutationInterval_: null,
    };
  },

  watch: {
    text: {
      immediate: true,
      handler() {
        this.renderText_ = this.text;
      },
    },
  },

  methods: {
    mutate_() {
      this.renderText_ = replaceRandomChar(this.renderText_);
    },

    onMouseEnter_() {
      this.$el.classList.add(this.$style.Host_Mutation);
      this.mutationInterval_ = setInterval(this.mutate_, 15);
    },

    onMouseLeave_() {
      clearInterval(this.mutationInterval_);

      let alteredIndices = [];
      for (let i = 0; i < this.renderText_.length; ++i) {
        if (this.renderText_[i] !== this.text[i]) {
          alteredIndices.push(i);
        }
      }

      alteredIndices = shuffle(alteredIndices);

      setTimeout(() => {
        this.$el.classList.remove(this.$style.Host_Mutation);
      }, Math.max(0, alteredIndices.length * 10 - 300));

      for (let i = 0; i < alteredIndices.length; ++i) {
        setTimeout(() => {
          this.renderText_ = replaceCharAt(
            this.renderText_,
            alteredIndices[i],
            this.text[alteredIndices[i]]
          );
        }, i * 10 + Math.random() * 10);
      }
    },
  },
};
</script>

<style module lang="sass">
@import '@/src/scss/fonts';

@mixin _fonts-0003-code {
  @include _fonts-base;

  font-family: monospace;
  font-size: 20px;
  line-height: normal;
}

.Host {
  @include _fonts-0003-code;

  cursor: pointer;
  filter: blur(0px);
  transition: all 300ms;
}

.Host_Mutation {
  animation: shake 250ms cubic-bezier(.36,.07,.19,.97) both;
  filter: blur(2px);
  text-shadow: 2px 2px 0px rgba(#F00, 0.5), -2px -2px 0px rgba(#00F, 0.5);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
