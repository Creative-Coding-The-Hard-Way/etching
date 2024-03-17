import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import P5 from "p5";

new Page("Scene Layout", (p5: P5) => {
  const sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: p5.random(25, 200),
  });
  const { w, h, scene } = sketch.layout;

  p5.preload = () => {
    sketch.assets.load_special_elite();
  };

  p5.setup = () => {
    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    p5.background(sketch.palette.old_paper());
    p5.noFill();

    pushpop(p5, () => {
      p5.noStroke();
      p5.fill(0, 48);
      p5.rect(scene.left, scene.top, scene.w, scene.h);
    });

    pushpop(p5, () => {
      p5.stroke(sketch.palette.gunmetal());
      p5.strokeWeight(10);
      p5.circle(
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
        200
      );
    });

    pushpop(p5, () => {
      p5.fill(sketch.palette.old_paper());
      sketch.paint_margins();
    });

    pushpop(p5, () => {
      p5.fill(sketch.palette.gunmetal());
      p5.textFont(sketch.assets.load_special_elite());
      sketch.draw_seed();
    });

    p5.noLoop();
  };
});

export {};
