import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import P5 from "p5";

const LINE_WEIGHT = {
  feature: 3,
  highlight: 2,
  detail: 1,
};

new Page("Moonscape", (p5: P5) => {
  const sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: 50,
  });
  const { w, h, scene } = sketch.layout;

  p5.preload = () => sketch.assets.load_special_elite();
  p5.setup = () => p5.createCanvas(w, h);

  p5.draw = () => {
    p5.background(sketch.palette.old_paper());
    p5.fill(sketch.palette.old_paper());
    p5.stroke(sketch.palette.gunmetal());

    const horizon = scene.bottom - p5.random(scene.h / 5, scene.h / 3);
    const moon_size = p5.random(scene.w / 6, scene.w / 4);
    const moon_height = p5.random(scene.h / 3);
    pushpop(p5, () => moon(horizon - moon_height, moon_size));
    pushpop(p5, () => water_line(horizon));
    pushpop(p5, () => moon_reflection(horizon, moon_height, moon_size));

    pushpop(p5, () => {
      p5.fill(sketch.palette.old_paper());
      sketch.paint_margins();
      p5.fill(sketch.palette.gunmetal());
      p5.textFont(sketch.assets.load_special_elite());
      sketch.draw_seed();
    });

    p5.noLoop();
  };

  function moon_reflection(
    horizon: number,
    moon_height: number,
    moon_size: number
  ) {
    p5.strokeWeight(LINE_WEIGHT.detail);
    p5.translate(scene.center_x, horizon);
    p5.scale(1, 1.1);
    p5.circle(0, moon_height, moon_size);
  }

  function moon(y: number, moon_size: number) {
    p5.strokeWeight(LINE_WEIGHT.feature);
    p5.circle(scene.center_x, y, moon_size);
  }

  function water_line(y: number) {
    // erase the background
    p5.noStroke();
    p5.rect(scene.left, y, scene.w, scene.bottom - y);

    // paint the horizon line and waves
    p5.stroke(sketch.palette.gunmetal());
    p5.strokeWeight(LINE_WEIGHT.feature);
    p5.line(scene.left, y, scene.right, y);
    p5.strokeWeight(LINE_WEIGHT.detail);
    p5.line(scene.left + 5, y + 8, scene.right - 5, y + 8);
    p5.line(scene.left + 8, y + 12, scene.right - 8, y + 12);
  }
});

export {};
