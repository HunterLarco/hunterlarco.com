<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { InlineTextType } from '@/components/InlineText/InlineTextProps';
import type { InlineTextProps } from '@/components/InlineText/InlineTextProps';

const style = useCssModule();

const props = defineProps<InlineTextProps>();

const hostClass = computed((): string => TEXT_TYPE_TO_CLASS[props.type]);

const TEXT_TYPE_TO_CLASS: Record<InlineTextType, string> = {
  [InlineTextType.BODY]: style.Body,
};
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
