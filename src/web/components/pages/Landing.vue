<template>
  <div :class="$style.Host">
    <div :class="$style.Bio">
      <div :class="$style.Name">Hunter Larco</div>
      <div :class="$style.Tagline">
        Currently making the internet a better place
        <a href="https://www.mozilla.org/en-US/firefox/unfck/" target="blank"
          >#unfck</a
        >
      </div>
    </div>

    <div :class="$style.Tiles">
      <div :class="$style.Tile">
        <img src="~@/src/web/assets/logos/Mozilla.png" />
      </div>

      <div :class="$style.Tile" style="margin-top: 75px;">
        <img src="~@/src/web/assets/logos/Notion.png" />
      </div>

      <div :class="$style.Tile" style="margin-top: 150px;">
        <img src="~@/src/web/assets/logos/Google.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';
@import '@/src/web/sass/layout';

.Host {
  @include layout-fill;

  background: #000;
  overflow-x: hidden;
  overflow-y: scroll;
}

.Bio {
  max-width: 500px;
  padding: 60px;

  & a {
    color: #E71A8B;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.Name {
  @include fonts-name;

  color: rgba(#FFF, 0.5);
}

.Tagline {
  @include fonts-tagline;

  color: #FFF;

  margin-top: 20px;
}

.Tiles {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(400px, calc(33% - 12px)));
  padding: 60px;
}

.Tile {
  background: #FFF;
  border-radius: 12px;
  height: 800px;

  & > img {
    height: 60px;
    margin: 40px;
  }
}
</style>
