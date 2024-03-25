import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import P5 from "p5";
import { blossom } from "./blossom";

new Page("Blossom", (p5: P5) => {
  p5.colorMode(p5.HSL);

  const flower_colors = [
    p5.color(51, 75, 51),
    p5.color(212, 30, 60),
    p5.color(289, 15, 55),
    p5.color(332, 30, 65),
  ];
  let sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: 50,
  });
  let { w, h, scene } = sketch.layout;

  p5.preload = () => sketch.assets.load_special_elite();
  p5.setup = () => p5.createCanvas(w, h);
  p5.windowResized = () => location.reload();

  p5.draw = () => {
    p5.background(sketch.palette.old_paper());

    const blossoms = p5.random(5, 20);
    const offset = scene.w * 0.2;
    for (let i = 0; i < blossoms; i++) {
      blossom(p5, {
        x: p5.random(scene.left + offset, scene.right - offset),
        y: p5.random(scene.top + offset, scene.bottom - offset),
        size: p5.random(sketch.layout.em * 8, sketch.layout.em * 16),
        stroke_color: sketch.palette.gunmetal(),
        petal_color: p5.random(flower_colors),
      });
    }

    // draw the seed
    pushpop(p5, () => {
      p5.fill(sketch.palette.old_paper());
      sketch.paint_margins();
      p5.fill(sketch.palette.gunmetal());
      p5.textFont(sketch.assets.load_special_elite());
      sketch.draw_seed();
    });

    p5.noLoop();
  };
});

export {};
