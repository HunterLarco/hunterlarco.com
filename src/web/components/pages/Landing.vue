<template>
  <div :class="$style.Host">
    <div :class="$style.Sidebar">
      <div :class="$style.Bio">
        <div :class="$style.Name">Hunter Larco</div>
        <div :class="$style.Tagline">
          Currently making the internet a better place
          <a href="https://www.mozilla.org/en-US/firefox/unfck/" target="blank"
            >#unfck</a
          >
        </div>
      </div>

      <div :class="$style.Nav">
        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Drip.png" />
          <label>Drip</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Mozilla.png" />
          <label>Mozilla Builders: Superduper</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Mozilla.png" />
          <label>Mozilla Builders: Fido</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Sutra.svg" />
          <label>Sutra</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Notion.png" />
          <label>Notion</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/FireChat.png" />
          <label>FireChat</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Sadboi.png" />
          <label>Terrace: sadboi.tv</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/OnDeck.png" />
          <label>On Deck: 1st Cohort</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
          <label>Triplebyte: Remote Interviewer</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Google.svg" />
          <label>Google Research: Waybak</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Google.svg" />
          <label>Google Ads: Express</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
          <label>Triplebyte: Generalist</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/MakeSchool.png" />
          <label>Make School: Inaugural Class</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
          <label>Chrome Experiments: voxel.css</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
          <label>Chrome Experiments: Wireframe Ripple</label>
        </div>
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

  overflow-x: hidden;
  overflow-y: scroll;
}

.Sidebar {
  @include layout-vertical;

  height: 100%;
  max-width: 620px;
}

.Bio {
  flex-grow: 1;
  padding: 60px;

  & a {
    color: #E71A8B;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.Nav {
  flex-shrink: 0;
  padding: 60px;
}

.NavItem {
  cursor: pointer;
  margin: 16px 0;

  & > img {
    height: 20px;
    margin-right: 12px;
    vertical-align: middle;
  }

  & > label {
    @include fonts-body;

    cursor: inherit;
    vertical-align: middle;
  }

  &:hover > label {
    text-decoration: underline;
  }
}

.Name {
  @include fonts-name;
}

.Tagline {
  @include fonts-tagline;

  margin-top: 20px;
}
</style>
