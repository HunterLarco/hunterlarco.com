<script setup lang="ts">
import * as inlineText from '@/components/InlineText';

import type { ExperienceItemProps } from '@/components/ExperienceTable/ExperienceItemProps';

defineProps<ExperienceItemProps>();
</script>

<template>
  <div :class="$style.Host">
    <img :src="logo" />

    <div :class="$style.Title">
      <inlineText.InlineText
        :class="$style.Text"
        :type="inlineText.InlineTextType.BODY"
        >{{ title }}</inlineText.InlineText
      >
      <div :class="$style.Line" />
    </div>

    <div :class="$style.Role">
      <inlineText.InlineText
        :class="$style.Text"
        :type="inlineText.InlineTextType.BODY"
        >{{ role }}</inlineText.InlineText
      >
      <div :class="$style.Line" />
    </div>

    <inlineText.InlineText
      :class="$style.Text"
      :type="inlineText.InlineTextType.BODY"
      >{{ year }}</inlineText.InlineText
    >
  </div>
</template>

<style module>
.Host {
  color: inherit;
  cursor: pointer;
  padding: 8px 0;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;

  img {
    height: 20px;
    margin-right: 12px;
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

.Title {
  flex-grow: 1;

  align-items: center;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.Role {
  flex-shrink: 0;
  width: 173px;

  align-items: center;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.Text {
  flex-shrink: 0;
}

.Line {
  background: #d9d9d9;
  display: inline-block;
  flex-grow: 1;
  height: 1px;
  margin: -1px 10px 0 10px;
}
</style>
