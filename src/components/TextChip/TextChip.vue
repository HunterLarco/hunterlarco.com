<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import * as inlineText from '@/components/InlineText';
import type { TextChipProps } from '@/components/TextChip/TextChipProps';

const props = defineProps<TextChipProps>();

const style = useCssModule();

const hostClassModifiers = computed(() =>
  props.selected ? [style.Host_Selected] : [],
);
</script>

<template>
  <span :class="[$style.Host, ...hostClassModifiers]">
    <inlineText.InlineText :type="inlineText.InlineTextType.BODY"
      ><slot
    /></inlineText.InlineText>
  </span>
</template>

<style module>
.Host {
  border-radius: 100px;
  border: 1px solid #000;
  cursor: pointer;
  display: inline-block;
  padding: 5px 14px;
  user-select: none;
}

.Host_Selected {
  background: #000;
  color: #fff;
}
</style>
