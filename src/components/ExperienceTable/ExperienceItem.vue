<script setup lang="ts">
import * as inlineText from '@/components/InlineText';

import { ExperienceItemProps } from '@/components/ExperienceTable/ExperienceItemProps';

defineProps<ExperienceItemProps>();

</script>

<template>
  <div :class="$style.Host">
    <img :src="logo" />
    <inlineText.InlineText :type="inlineText.InlineTextType.BODY">{{ title }}</inlineText.InlineText>
    <div :class="$style.Line" style="width: 216px" />
      <inlineText.InlineText :type="inlineText.InlineTextType.BODY">{{ role }}</inlineText.InlineText>
    <div :class="$style.Line" style="width: 92px" />
      <inlineText.InlineText :type="inlineText.InlineTextType.BODY">{{ year }}</inlineText.InlineText>
  </div>
</template>

<style module>
.Host {
  color: inherit;
  cursor: pointer;
  display: block;
  padding: 8px 0;
  text-decoration: none;
  
  * {
    vertical-align: middle;
  }

  img {
    height: 20px;
    margin-right: 12px;
    vertical-align: middle;
  }

  &:hover {
    * {
      text-decoration: underline;
    }

    .Line {
      background: #929292;
    }
  }
}

.Line {
  background: #d9d9d9;
  display: inline-block;
  height: 1px;
  margin: -1px 10px 0 10px;
}
</style>
