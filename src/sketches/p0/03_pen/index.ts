import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import { Pen } from "~/src/lib/pen";
import P5 from "p5";

new Page("Pen", (p5: P5) => {
  const sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: p5.random(25, 200),
  });
  const { w, h, scene } = sketch.layout;
  const pen = new Pen(p5, { jitter: 0.25, weight: 3 });

  p5.preload = () => sketch.assets.load_special_elite();
  p5.setup = () => p5.createCanvas(w, h);

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
      pen.line(
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom)
      );

      const s = [
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
      ];
      const c1 = [
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
      ];
      const c2 = [
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
      ];
      const e = [
        p5.random(scene.left, scene.right),
        p5.random(scene.top, scene.bottom),
      ];
      pen.bezier(s[0], s[1], c1[0], c1[1], c2[0], c2[1], e[0], e[1]);
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
