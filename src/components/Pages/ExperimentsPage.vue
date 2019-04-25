<template>
  <div :class="$style.Host">
    <div :class="$style.Toolbar">
      <div :class="$style.ToolbarTitle">
        <router-link to="/" :class="$style.Title">hunterlarco</router-link>
        <span :class="$style.Subtitle">experiments</span>
      </div>
      <div :class="$style.ToolbarButtons">
        <TextInput placeholder="Search experiments" />
      </div>
    </div>

    <div :class="$style.Construction">
      This page is currently under construction =)
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/Forms/TextInput';

export default {
  components: { TextInput },
};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include layout-fill;
}

.Toolbar {
  @include layout-horizontal;

  align-items: center;
  margin: 32px;
}

.ToolbarTitle {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ToolbarButtons {
  flex-shrink: 0;
}

.Title {
  @include fonts-title;
}

.Subtitle {
  @include fonts-subtitle;

  margin-left: 4px;
}

.Construction {
  @include fonts-body;

  margin: 128px 32px;
  text-align: center;
}
</style>
