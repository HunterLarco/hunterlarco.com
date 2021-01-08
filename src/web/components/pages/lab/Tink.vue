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
        pixelRatio: 'auto',
        width: 800,
        height: 600,
        //      showAngleIndicator: true,
      },
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(400, 600, 800, 1, { isStatic: true }),
      Matter.Bodies.rectangle(50, 80, 40, 40, {
        angle: -0.25,
        chamfer: { radius: 10 },
      }),
      Matter.Bodies.rectangle(50, 10, 30, 30, {
        angle: 0.1,
        chamfer: { radius: 8 },
      }),
    ]);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);

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
