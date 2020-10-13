<template>
  <div :class="$style.Host">
    <div :class="$style.Sidebar">
      <div :class="$style.Bio">
        <div>
          <div :class="$style.Name">Hunter Larco</div>
          <a
            :class="$style.SocialIcon"
            href="https://github.com/hunterlarco"
            target="blank"
          >
            <img src="~@/src/web/assets/icons/Github.png" />
          </a>
          <a
            :class="$style.SocialIcon"
            href="https://linkedin.com/in/hunterlarco"
            target="blank"
          >
            <img src="~@/src/web/assets/icons/LinkedIn.png" />
          </a>
        </div>
        <div :class="$style.Tagline">
          Currently making the internet a better place
          <a href="https://www.mozilla.org/en-US/firefox/unfck/" target="blank"
            >#unfck</a
          >
        </div>

        <div :class="$style.Blurb">
          Youngest <span v-if="$sizing.gt(510)">engineering hire</span
          ><span v-else>engineer</span> at
          <img
            :class="$style.BlurbImage_Google"
            src="~@/src/web/assets/logos/Google.png"
          />
        </div>
        <div :class="$style.Blurb">
          Co-founded a <span v-show="$sizing.gt(510)">research</span> team at
          <img
            :class="$style.BlurbImage_Google"
            src="~@/src/web/assets/logos/Google.png"
          />
        </div>
        <div :class="$style.Blurb">
          Founded
          <img
            :class="$style.BlurbImage_Terrace"
            src="~@/src/web/assets/logos/Terrace.png"
          />
        </div>
        <div :class="$style.Blurb">
          Building <span v-show="$sizing.gt(510)">a better internet</span> at
          <img
            :class="$style.BlurbImage_Mozilla"
            src="~@/src/web/assets/logos/Mozilla.png"
          />
        </div>
      </div>

      <div :class="$style.Nav">
        <div
          :class="$style.Filters"
          :style="expanded_ ? '' : 'max-width: 640px'"
        >
          <div
            :class="
              filter_ == 'full-time' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'full-time' ? null : 'full-time'"
          >
            Full-time
          </div>

          <div
            :class="
              filter_ == 'fellow' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'fellow' ? null : 'fellow'"
          >
            Fellow
          </div>

          <div
            :class="
              filter_ == 'founder' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'founder' ? null : 'founder'"
          >
            Founder
          </div>

          <div
            :class="
              filter_ == 'advisor' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'advisor' ? null : 'advisor'"
          >
            Advisor
          </div>

          <div
            :class="
              filter_ == 'speaker' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'speaker' ? null : 'speaker'"
            v-show="expanded_"
          >
            Speaker
          </div>

          <div
            :class="
              filter_ == 'certificate' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'certificate' ? null : 'certificate'"
          >
            Certificate
          </div>

          <div
            :class="filter_ == 'award' ? $style.Filter_Selected : $style.Filter"
            @click="filter_ = filter_ == 'award' ? null : 'award'"
            v-show="expanded_"
          >
            Award
          </div>

          <div
            :class="
              filter_ == 'education' ? $style.Filter_Selected : $style.Filter
            "
            @click="filter_ = filter_ == 'education' ? null : 'education'"
            v-show="expanded_"
          >
            Education
          </div>
        </div>

        <div
          :class="$style.NavColumns"
          :style="expanded_ ? 'column-width: 640px' : ''"
        >
          <a
            href="https://drip.is"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'advisor' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/Drip.png" />
            <label>Drip</label>
            <div :class="$style.Line" style="width: 350px;" />
            <label>Advisor</label>
            <div :class="$style.Line" style="width: 100px;" />
            <label>2020</label>
          </a>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'fellow' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Mozilla.png" />
            <label>Mozilla Builders: Superduper</label>
            <div :class="$style.Line" style="width: 174px;" />
            <label>Fellow</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2020</label>
          </div>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'fellow' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Mozilla.png" />
            <label>Mozilla Builders: Fido</label>
            <div :class="$style.Line" style="width: 227px;" />
            <label>Fellow</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2020</label>
          </div>

          <a
            href="https://sutra.fit"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'advisor' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/Sutra.svg" />
            <label>Sutra</label>
            <div :class="$style.Line" style="width: 341px;" />
            <label>Advisor</label>
            <div :class="$style.Line" style="width: 100px;" />
            <label>2020</label>
          </a>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'full-time' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Notion.png" />
            <label>Notion</label>
            <div :class="$style.Line" style="width: 333px;" />
            <label>Full-time</label>
            <div :class="$style.Line" style="width: 92px;" />
            <label>2020</label>
          </div>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'advisor' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/FireChat.png" />
            <label>FireChat</label>
            <div :class="$style.Line" style="width: 318px;" />
            <label>Advisor</label>
            <div :class="$style.Line" style="width: 100px;" />
            <label>2020</label>
          </div>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'founder' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Sadboi.png" />
            <label>Terrace: sadboi.tv</label>
            <div :class="$style.Line" style="width: 253px;" />
            <label>Founder</label>
            <div :class="$style.Line" style="width: 94px;" />
            <label>2019</label>
          </div>

          <a
            href="https://www.beondeck.com/"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'fellow' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/OnDeck.png" />
            <label>On Deck: 2nd Cohort NYC</label>
            <div :class="$style.Line" style="width: 190px;" />
            <label>Fellow</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2019</label>
          </a>

          <a
            href="https://www.beondeck.com/"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'fellow' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/OnDeck.png" />
            <label>On Deck: 1st Cohort SF</label>
            <div :class="$style.Line" style="width: 209px;" />
            <label>Fellow</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2019</label>
          </a>

          <a
            href="https://triplebyte.com/tb/hunter-j-larco-oca2jcx/certificate/track/generalist"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'certificate' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
            <label>Triplebyte: Generalist</label>
            <div :class="$style.Line" style="width: 228px;" />
            <label>Certificate</label>
            <div :class="$style.Line" style="width: 80px;" />
            <label>2019</label>
          </a>

          <a
            href="https://www.kdd.org/kdd2019/accepted-papers/view/nostalgin-extracting-3d-city-models-from-historical-image-data"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'speaker' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/KDD.png" />
            <label>SIGKDD: Nostalgin</label>
            <div :class="$style.Line" style="width: 242px;" />
            <label>Speaker</label>
            <div :class="$style.Line" style="width: 93px;" />
            <label>2019</label>
          </a>

          <div
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'full-time' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Google.svg" />
            <label>Google Research: Waybak</label>
            <div :class="$style.Line" style="width: 189px;" />
            <label>Full-time</label>
            <div :class="$style.Line" style="width: 92px;" />
            <label>2017</label>
          </div>

          <router-link
            to="/history/google-ads"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'full-time' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Google.svg" />
            <label>Google Ads: Express</label>
            <div :class="$style.Line" style="width: 230px;" />
            <label>Full-time</label>
            <div :class="$style.Line" style="width: 92px;" />
            <label>2016</label>
          </router-link>

          <a
            href="https://triplebyte.com/tb/hunter-j-larco-oca2jcx/certificate/track/generalist"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'certificate' ? 'opacity: 0.2' : ''"
          >
            <img src="~@/src/web/assets/favicons/Triplebyte.jpg" />
            <label>Triplebyte: Generalist</label>
            <div :class="$style.Line" style="width: 228px;" />
            <label>Certificate</label>
            <div :class="$style.Line" style="width: 80px;" />
            <label>2016</label>
          </a>

          <a
            href="https://experiments.withgoogle.com/voxel-css"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'award' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
            <label>Chrome Experiments: voxel.css</label>
            <div :class="$style.Line" style="width: 154px;" />
            <label>Award</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2016</label>
          </a>

          <a
            href="https://www.makeschool.com/"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'education' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/MakeSchool.png" />
            <label>Make School: Inaugural Class</label>
            <div :class="$style.Line" style="width: 166px;" />
            <label>Education</label>
            <div :class="$style.Line" style="width: 82px;" />
            <label>2015</label>
          </a>

          <a
            href="https://experiments.withgoogle.com/wireframe-ripple-simulation"
            target="blank"
            :class="$style.NavItem"
            :style="filter_ && filter_ != 'award' ? 'opacity: 0.2' : ''"
            v-show="expanded_"
          >
            <img src="~@/src/web/assets/favicons/ChromeExperiments.png" />
            <label>Chrome Experiments: Wireframe Ripple</label>
            <div :class="$style.Line" style="width: 96px;" />
            <label>Award</label>
            <div :class="$style.Line" style="width: 108px;" />
            <label>2012</label>
          </a>

          <div
            :class="[$style.NavItem, $style.NavItemButton]"
            @click="expanded_ = true"
            v-show="!expanded_"
          >
            <img src="~@/src/web/assets/icons/Chevron.svg" />
            <label>Show more</label>
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

    <div :class="$style.People">
      <div :class="$style.Name">
        A collection of the best and brightest from my career
      </div>
      <div :class="$style.Tagline">People I vouch for</div>

      <div :class="$style.PeopleGrid">
        <JimmyYue />
        <AmolKapoor />
        <AustinDiamond />
        <WillGowell />
        <NateDruckerman />
        <MikeKane />
        <LukeSolomon />
      </div>
    </div>
  </div>
</template>

<script>
import AmolKapoor from '@/src/web/components/people/AmolKapoor';
import AustinDiamond from '@/src/web/components/people/AustinDiamond';
import JimmyYue from '@/src/web/components/people/JimmyYue';
import LukeSolomon from '@/src/web/components/people/LukeSolomon';
import MikeKane from '@/src/web/components/people/MikeKane';
import NateDruckerman from '@/src/web/components/people/NateDruckerman';
import WillGowell from '@/src/web/components/people/WillGowell';

export default {
  components: {
    AustinDiamond,
    AmolKapoor,
    JimmyYue,
    LukeSolomon,
    MikeKane,
    NateDruckerman,
    WillGowell,
  },

  data() {
    return {
      expanded_: false,
      filter_: null,
    };
  },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/fonts';
@import '@/src/web/sass/layout';
@import '@/src/web/sass/sizing';

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
  padding: 60px;

  @include sizing-mobile {
    padding: 30px;
  }

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

  display: inline-block;
  margin-bottom: 20px;
  vertical-align: middle;
}

.SocialIcon {
  float: right;

  & > img {
    height: 24px;
    margin-bottom: 4px;
    margin-left: 10px;
    vertical-align: middle;
  }
}

.Tagline {
  @include fonts-tagline;

  margin-bottom: 20px;
}

.Blurb {
  @include fonts-blurb;

  margin-top: 5px;
}

@mixin _blurb-image {
  height: 24px;
  vertical-align: middle;
}

.BlurbImage_Google {
  @include _blurb-image;
}

.BlurbImage_Terrace {
  @include _blurb-image;

  height: 20px;
  margin-bottom: 6px;
}

.BlurbImage_Mozilla {
  @include _blurb-image;

  margin-bottom: 2px;
}

.Nav {
  flex-shrink: 0;
  padding: 0 60px 60px 60px;

  @include sizing-mobile {
    padding: 0 30px 30px 30px;
  }
}

.NavColumns {
  column-gap: 60px;
  max-width: 1405px;

  @include sizing-mobile {
    column-gap: 30px;
  }
}

.Filters {
  margin-bottom: 40px;

  @include sizing-mobile {
    display: none;
  }
}

.Filter {
  @include fonts-body;

  border-radius: 100px;
  border: 1px solid #000;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px 14px;
  user-select: none;

  &:last-child {
    margin-right: 0;
  }
}

.Filter_Selected {
  @extend .Filter;

  background: #000;
  color: #FFF;
}

.Expand {
  @include fonts-body;

  cursor: pointer;
  padding: 8px 0;
}

.NavItem {
  color: inherit;
  cursor: pointer;
  display: block;
  padding: 8px 0;
  text-decoration: none;

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


  @media (max-width: 760px) {
    & > * ~ * ~ * {
      display: none !important;
    }
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

.People {
  padding: 0 60px 60px 60px;

  @include sizing-mobile {
    padding: 0 30px 30px 30px;
  }
}

.PeopleGrid {
  display: grid;
  grid-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  margin-top: 60px;
  max-width: 1220px;
}
</style>
