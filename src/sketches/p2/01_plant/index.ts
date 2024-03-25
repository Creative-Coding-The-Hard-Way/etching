import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import { blossom } from "~/src/sketches/p2/00_blossom/blossom";
import P5 from "p5";

interface PlantParams {
  max_level: number;
  stem_color: P5.Color;
  ink_color: P5.Color;
  max_branches: number;
  petal_color: P5.Color;
}

function plant(p5: P5, level: number, params: PlantParams) {
  if (level >= params.max_level) {
    blossom(p5, {
      x: 0,
      y: 0,
      size: p5.random(250, 310),
      stroke_color: params.ink_color,
      petal_color: params.petal_color,
      petal_count: 6,
    });
    return;
  }

  pushpop(p5, () => {
    const stem_length = 50;
    const bottom_width = 3;
    const top_width = 2;

    // draw the stem
    p5.noStroke();
    p5.fill(params.stem_color);
    p5.beginShape();
    p5.vertex(bottom_width, 0);
    p5.vertex(top_width, stem_length);
    p5.vertex(-top_width, stem_length);
    p5.vertex(-bottom_width, 0);
    p5.endShape();

    // draw the stem outline
    p5.stroke(params.ink_color);
    p5.strokeWeight(3);
    p5.line(3, 0, 2.5, stem_length);
    p5.line(-3, 0, -2.5, stem_length);

    if (level < 3 && params.max_branches > 0) {
      if (p5.random() > 0.75) {
        params.max_branches -= 1;
        pushpop(p5, () => {
          p5.translate(0, stem_length);
          p5.rotate(p5.PI * p5.random(-0.25, 0.25));
          p5.scale(0.9, 0.9);
          plant(p5, level + 1, params);
        });
      }
    }

    // draw the next stem segment
    pushpop(p5, () => {
      p5.translate(0, stem_length);
      p5.rotate(p5.PI * p5.random(-0.15, 0.15));
      p5.scale(0.9, 0.9);
      plant(p5, level + 1, params);
    });
  });
}

new Page("Plant", (p5: P5) => {
  const sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: 50,
  });
  const { w, h, scene } = sketch.layout;

  p5.colorMode(p5.HSL);
  const flower_colors = [
    p5.color(51, 75, 51),
    p5.color(212, 30, 60),
    p5.color(289, 15, 55),
    p5.color(332, 30, 65),
  ];

  p5.preload = () => sketch.assets.load_special_elite();
  p5.setup = () => p5.createCanvas(w, h);

  p5.draw = () => {
    p5.background(sketch.palette.old_paper());

    const horizon = scene.bottom - scene.h * 0.3;

    // draw a flower
    const offset = scene.w * 0.25;
    const flower_count = p5.floor(p5.random(1, 8));
    for (let i = 0; i < flower_count; i++) {
      pushpop(p5, () => {
        p5.translate(
          p5.random(scene.left + offset, scene.right - offset),
          horizon
        );
        p5.rotate(p5.PI * p5.random(-0.1, 0.1));
        const s = p5.random(0.8, 1.1);
        p5.scale(s, -s);
        plant(p5, 0, {
          max_level: 7,
          stem_color: sketch.palette.old_paper(),
          ink_color: sketch.palette.gunmetal(),
          max_branches: 4,
          petal_color: p5.random(flower_colors),
        });
      });
    }

    // draw the ground
    pushpop(p5, () => {
      p5.strokeWeight(3);
      p5.stroke(sketch.palette.gunmetal());
      p5.line(scene.left, horizon, scene.right, horizon);
    });

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
