<template>
  <div :class="$style.Host">
    <div :class="$style.Text">
      <p>
        <b>Hunter Larco</b>
        &mdash; Currently building a better home for art on the web
        <a href="https://terrace.co" target="blank">@terrace.co</a>
      </p>
      <br />
      <img src="~@/src/web/assets/logos/MozillaBuilders.jpg" />
      <img src="~@/src/web/assets/logos/Notion.png" />
      <img src="~@/src/web/assets/logos/OnDeck.png" />
      <br />
      <img src="~@/src/web/assets/logos/GoogleResearch.png" />
      <img src="~@/src/web/assets/logos/GoogleAds.png" />
      <br />
      <img src="~@/src/web/assets/logos/Triplebyte.png" />
      <img src="~@/src/web/assets/logos/ChromeExperiments.jpg" />
      <br />
      <p>
        <a href="https://www.linkedin.com/in/hunterlarco" target="blank"
          >linkedin.com/in/hunterlarco</a
        ><br />
        <a href="http://github.com/hunterlarco" target="blank"
          >github.com/hunterlarco</a
        >
      </p>
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
  @include layout-center;
  @include layout-fill;
}

.Text {
  @include fonts-body;

  & a {
    color: #E71A8B;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  & img {
    width: 300px;
  }
}
</style>
