<template>
  <div :class="$style.Host">
    <div :class="$style.CenteredContent">
      <div :class="$style.Title">Hey, I'm Hunter</div>

      <div :class="$style.Paragraph">
        Recently, I've been driven by a mission: use technology to tell stories.
        I am in passionate pursuit of products that inspire and nourish emotion
        in their users with everyday tales of the people around us. In that
        vein, this website is both my playground and my portfolio.
      </div>

      <div :class="$style.Paragraph">
        Professionally, I've worked on several projects&mdash;recent projects
        that stand out include
      </div>

      <JobTile
        :class="$style.JobTile"
        organization="Google Research"
        project="Machine Learning & Computer Vision"
        :icon="require('@/assets/google.logo.png')"
      >
        Co-founded a new initiative within Google Research focused on 3D
        reconstruction from a single image. Developed several research
        directions within this role using traditional computer vision approaches
        in addition to end-to-end learning.
      </JobTile>

      <JobTile
        :class="$style.JobTile"
        organization="Google Research"
        project="Graph Analysis & Visualization"
        :icon="require('@/assets/google.logo.png')"
      >
        Created a graph visualizer and analysis tool that became the primary
        graph understanding utility within Google&mdash;providing insights for
        graphs with billions of nodes.
      </JobTile>

      <JobTile
        :class="$style.JobTile"
        organization="Google Ads & Commerce"
        project="Serving and Indexing Infrastructure"
        :icon="require('@/assets/google.logo.png')"
      >
        Designed and developed the drop-in replacement for a core serving
        component of Google Express while serving live high-bandwidth traffic
        with no user interruptions.
      </JobTile>

      <JobTile
        :class="$style.JobTile"
        organization="LarcoLabs"
        project="Founder & Developer"
        :icon="require('@/assets/unknown.logo.png')"
      >
        Started LarcoLabs, a freelancing agency that helps non-technical
        companies tackle technical verticals. Spanning several projects, this
        work ranged from UI/UX to iOS development to developing cloud software,
        including the sourcing and management of multiple sub-contractors.
      </JobTile>

      <div :class="$style.Paragraph">
        In my spare time I've built experiments such as
      </div>

      <div :class="$style.ExperimentGrid">
        <ExperimentTile
          project="Voxel CSS"
          :preview="require('@/assets/voxelcss.preview.png')"
        >
          Voxel CSS is a lightweight 3D voxel rendering library that renders
          scenes exclusively using CSS&mdash;intended to demonstrate the
          capabilities of 3D CSS.

          <router-link
            slot="chip"
            to="https://news.ycombinator.com/item?id=10977819"
            >#1 trending on Hacker News</router-link
          >
          <router-link slot="chip" to="https://github.com/HunterLarco/voxel.css"
            >#1 weekly trending repo on Github</router-link
          >
          <router-link
            slot="chip"
            to="https://www.reddit.com/r/web_design/comments/42u38e/voxelcss_an_opensource_inbrowser_3d_rendering/"
            >Top of r/web_design</router-link
          >
          <router-link
            slot="chip"
            to="https://www.reddit.com/r/webdev/comments/42wdlo/voxelcss_an_opensource_inbrowser_3d_engine/"
            >Top of r/webdev</router-link
          >
          <router-link
            slot="chip"
            to="https://www.reddit.com/r/javascript/comments/42wf1b/an_opensource_inbrowser_3d_engine_rendered_in_css/"
            >Top of r/javascript</router-link
          >
        </ExperimentTile>

        <ExperimentTile
          project="Nybble"
          :preview="require('@/assets/nybble.preview.png')"
        >
          Nybble is a custom designed CPU chip emulated in your browser. Built
          as a tool to teach CPU architecture, Nybble provides detailed
          visualizations of its eletrical state and subroutines in addition to
          supporting user-written assembly programs.
        </ExperimentTile>
      </div>

      <div :class="$style.Paragraph">
        I'm not actively looking for a job, however, I'm always open to new
        opportunities. If you are interested in hiring me, please take a look at
        my <router-link to="/resume">interactive resume</router-link>.
        Otherwise, I hope you enjoy looking around the
        <router-link to="/experiments">experiments</router-link> on this
        website.
      </div>

      <div :class="$style.Paragraph"><i>Hunter Larco</i></div>

      <div :class="$style.Paragraph">
        email:
        <a href="mailto:hunter@larcolabs.com">hunter@larcolabs.com</a><br />
        github:
        <a href="http://github.com/hunterlarco">github.com/hunterlarco</a><br />
        linkedin:
        <a href="http://linkedin.com/in/hunterlarco"
          >linkedin.com/in/hunterlarco</a
        >
      </div>
    </div>

    <FloatingShapes :class="$style.FloatingShapes" />
  </div>
</template>

<script>
import ExperimentTile from '@/components/ExperimentTile';
import FloatingShapes from '@/components/FloatingShapes';
import JobTile from '@/components/JobTile';

export default {
  components: { ExperimentTile, FloatingShapes, JobTile },
};
</script>

<style module lang="sass">
@import '@/scss/colors';
@import '@/scss/fonts';
@import '@/scss/layout';

.Host {
  @include layout-fill;
}

.CenteredContent {
  margin: 0 auto;
  max-width: 700px;
  padding: 32px;
}

.Title {
  @include fonts-title;

  margin: 32px 0;
  text-transform: lowercase;
}

.Paragraph {
  @include fonts-body;

  margin: 32px 0;
}

.JobTile {
  margin: 8px 0;
}

.ExperimentGrid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 32px 0;
}

.FloatingShapes {
  height: 300px;
  width: 100%;
}
</style>
