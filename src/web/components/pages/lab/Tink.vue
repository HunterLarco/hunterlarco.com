<template>
  <div :class="$style.Host">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as Matter from 'matter-js';

function createBoundingCircle(x, y, radius) {
  const numParts = 100;
  const arcAngle = (2 * Math.PI) / numParts;

  const parts = [];
  for (let i = 0; i < numParts; ++i) {
    const p1 = {
      x: radius * Math.cos(arcAngle * i),
      y: radius * Math.sin(arcAngle * i),
    };

    const p2 = {
      x: radius * Math.cos(arcAngle * i + arcAngle),
      y: radius * Math.sin(arcAngle * i + arcAngle),
    };

    const center = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };

    const distance = Math.sqrt(
      Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    );

    const rectangle = Matter.Bodies.rectangle(center.x, center.y, distance, 1, {
      isStatic: true,
      angle: arcAngle * i + arcAngle / 2 + Math.PI / 2,
    });

    parts.push(rectangle);
  }

  const body = Matter.Body.create({ parts, isStatic: true });
  Matter.Body.setPosition(body, { x, y });
  return body;
}

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

    const bounds = createBoundingCircle(400, 300, 200);

    Matter.World.add(engine.world, [
      bounds,
      Matter.Bodies.circle(500, 280, 20),
      Matter.Bodies.circle(460, 280, 20),
      Matter.Bodies.circle(420, 280, 20),
      Matter.Bodies.circle(380, 280, 20),
      Matter.Bodies.polygon(500, 320, 5, 20),
      Matter.Bodies.polygon(460, 320, 5, 20),
      Matter.Bodies.polygon(420, 320, 5, 20),
      Matter.Bodies.polygon(380, 320, 5, 20),
      Matter.Bodies.polygon(500, 360, 4, 20),
      Matter.Bodies.polygon(460, 360, 4, 20),
      Matter.Bodies.polygon(420, 360, 4, 20),
      Matter.Bodies.polygon(380, 360, 4, 20),
      Matter.Bodies.polygon(500, 400, 3, 20),
      Matter.Bodies.polygon(460, 400, 3, 20),
      Matter.Bodies.polygon(420, 400, 3, 20),
      Matter.Bodies.polygon(380, 400, 3, 20),
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

    Matter.Events.on(mouseConstraint, 'mousemove', (event) => {
      const { x, y } = event.mouse.position;
      const { width, height } = render.options;

      Matter.Body.setAngularVelocity(
        bounds,
        ((x - width / 2) / (width / 2)) * -0.02
      );
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
