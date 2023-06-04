function hamburgerComponent() {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;

  let engine;
  let world;
  let ball;

  return {
    canvas: null,
    ctx: null,

    init() {
      this.canvas = document.getElementById('burgerCanvas');
      this.ctx = this.canvas.getContext('2d');

      engine = Engine.create();
      world = engine.world;

      ball = Bodies.circle(300, 50, 20, { restitution: 0.7 });
      World.add(world, ball);

      this.setupRender();
    },

    startAnimation() {
      Matter.Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.05, y: 0.05 });
    },

    setupRender() {
      const render = Render.create({
        canvas: this.canvas,
        engine: engine,
        options: {
          width: this.canvas.width,
          height: this.canvas.height,
          wireframes: false
        }
      });

      Render.run(render);
      Engine.run(engine);
    }
  };
}
