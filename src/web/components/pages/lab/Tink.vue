<template>
  <div :class="$style.Host">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as Matter from 'matter-js';

export default {
  data() {
    return {};
  },

  mounted() {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: this.$refs.canvas,
      engine,
      options: {
        width: 800,
        height: 600,
        showAngleIndicator: true,
      },
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Matter.Bodies.rectangle(50, 40, 40, 40, {
        angle: -0.2,
        chamfer: { radius: 10 },
      }),
    ]);

    Matter.Render.run(render);
  },
};
</script>

<style module lang="sass">
@import '@/src/web/sass/layout';

.Host {
  @include layout-fill;

  overflow: hidden;
}
</style>
