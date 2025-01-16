<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import {InlineTextProps, InlineTextType} from '@/components/InlineText/InlineTextProps';

const style = useCssModule();

const props = defineProps<InlineTextProps>();

const hostClass = computed((): string => {
  switch (props.type) {
    case InlineTextType.BODY:
      return style.Body;
  }
});
</script>

<template>
  <span :class="hostClass"><slot /></span>
</template>

<style module>
.Body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4em;
}
</style>
