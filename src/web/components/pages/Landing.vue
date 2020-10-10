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

      <div :class="$style.Nav" :style="expanded_ ? 'column-width: 640px' : ''">
        <div
          :class="[$style.NavItem, $style.NavItemButton]"
          @click="expanded_ = true"
          v-show="!expanded_"
        >
          <img src="~@/src/web/assets/icons/Chevron.svg" />
          <label>Show more</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/Drip.png" />
          <label>Drip</label>
          <div :class="$style.Line" style="width: 350px;" />
          <label>Advisor</label>
          <div :class="$style.Line" style="width: 100px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Mozilla.png" />
          <label>Mozilla Builders: Superduper</label>
          <div :class="$style.Line" style="width: 174px;" />
          <label>Fellow</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Mozilla.png" />
          <label>Mozilla Builders: Fido</label>
          <div :class="$style.Line" style="width: 227px;" />
          <label>Fellow</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/Sutra.svg" />
          <label>Sutra</label>
          <div :class="$style.Line" style="width: 341px;" />
          <label>Advisor</label>
          <div :class="$style.Line" style="width: 100px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Notion.png" />
          <label>Notion</label>
          <div :class="$style.Line" style="width: 333px;" />
          <label>Full-time</label>
          <div :class="$style.Line" style="width: 92px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/FireChat.png" />
          <label>FireChat</label>
          <div :class="$style.Line" style="width: 318px;" />
          <label>Advisor</label>
          <div :class="$style.Line" style="width: 100px;" />
          <label>2020</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Sadboi.png" />
          <label>Terrace: sadboi.tv</label>
          <div :class="$style.Line" style="width: 253px;" />
          <label>Founder</label>
          <div :class="$style.Line" style="width: 94px;" />
          <label>2019</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/OnDeck.png" />
          <label>On Deck: 2nd Cohort NYC</label>
          <div :class="$style.Line" style="width: 190px;" />
          <label>Fellow</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2019</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/OnDeck.png" />
          <label>On Deck: 1st Cohort SF</label>
          <div :class="$style.Line" style="width: 209px;" />
          <label>Fellow</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2019</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
          <label>Triplebyte: Generalist</label>
          <div :class="$style.Line" style="width: 228px;" />
          <label>Certificate</label>
          <div :class="$style.Line" style="width: 80px;" />
          <label>2019</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/KDD.png" />
          <label>SIGKDD: Nostalgin</label>
          <div :class="$style.Line" style="width: 242px;" />
          <label>Speaker</label>
          <div :class="$style.Line" style="width: 93px;" />
          <label>2019</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Google.svg" />
          <label>Google Research: Waybak</label>
          <div :class="$style.Line" style="width: 189px;" />
          <label>Full-time</label>
          <div :class="$style.Line" style="width: 92px;" />
          <label>2017</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Google.svg" />
          <label>Google Ads: Express</label>
          <div :class="$style.Line" style="width: 230px;" />
          <label>Full-time</label>
          <div :class="$style.Line" style="width: 92px;" />
          <label>2016</label>
        </div>

        <div :class="$style.NavItem">
          <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
          <label>Triplebyte: Generalist</label>
          <div :class="$style.Line" style="width: 228px;" />
          <label>Certificate</label>
          <div :class="$style.Line" style="width: 80px;" />
          <label>2016</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
          <label>Chrome Experiments: voxel.css</label>
          <div :class="$style.Line" style="width: 154px;" />
          <label>Award</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2016</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/MakeSchool.png" />
          <label>Make School: Inaugural Class</label>
          <div :class="$style.Line" style="width: 166px;" />
          <label>Education</label>
          <div :class="$style.Line" style="width: 82px;" />
          <label>2015</label>
        </div>

        <div :class="$style.NavItem" v-show="expanded_">
          <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
          <label>Chrome Experiments: Wireframe Ripple</label>
          <div :class="$style.Line" style="width: 96px;" />
          <label>Award</label>
          <div :class="$style.Line" style="width: 108px;" />
          <label>2012</label>
        </div>

        <div
          :class="[$style.NavItem, $style.NavItemButton]"
          @click="expanded_ = false"
          v-show="expanded_"
        >
          <img
            src="~@/src/web/assets/icons/Chevron.svg"
            style="transform: scale(-1, 1);"
          />
          <label>Show less</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded_: false,
    };
  },
};
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

  min-height: 100%;
}

.Bio {
  flex-grow: 1;
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
}

.Tagline {
  @include fonts-tagline;

  margin-top: 20px;
}

.Nav {
  column-gap: 60px;
  flex-shrink: 0;
  max-width: 1405px;
  padding: 0 60px 60px 60px;
}

.Expand {
  @include fonts-body;

  cursor: pointer;
  padding: 8px 0;
}

.NavItem {
  cursor: pointer;
  padding: 8px 0;

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

  &:hover > .Line {
    background: #929292;
  }

  &:hover > label {
    text-decoration: underline;
  }
}

.NavItemButton {
  opacity: 0.4;
}

.Line {
  background: #D9D9D9;
  display: inline-block;
  height: 1px;
  margin: 0 10px;
}
</style>
