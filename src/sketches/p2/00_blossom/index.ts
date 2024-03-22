import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import P5 from "p5";

const LINE_WEIGHT = {
  feature: 3,
  highlight: 2,
  detail: 1,
};

interface PetalParams {
  color: P5.Color;
}

/**
 * Draws a single petal.
 *
 * Petals are 150 pixels tall starting from y=0 and ending at y = 150.
 * Orientation and size can be controlled by calling p5.rotate/translate/scale.
 */
function petal(p5: P5, params: PetalParams) {
  const y_start = 10;
  const y_end = 150;
  const size = 150;

  const c1 = {
    x: p5.random(70, 90),
    y: p5.random(30, 60),
  };
  const c2 = {
    x: p5.random(c1.x / 10, c1.x / 5),
    y: p5.random(65, 120),
  };

  // fill in the petal
  pushpop(p5, () => {
    p5.fill(params.color);
    p5.strokeWeight(3);
    p5.bezier(0, y_start, c1.x, c1.y, c2.x, c2.y, 0, y_end);
    p5.bezier(0, y_start, -c1.x, c1.y, -c2.x, c2.y, 0, y_end);
  });

  // Detail Lines
  pushpop(p5, () => {
    p5.noFill();
    p5.strokeWeight(1);

    // center line
    p5.bezier(
      0,
      y_start + p5.random(size / 4),
      p5.random(-5, 5),
      y_start + size * 0.3,
      p5.random(-5, 5),
      y_start + size * 0.6,
      0,
      y_end - p5.random(size / 4)
    );

    // petal crease lines
    const lines = p5.random(2, 4);
    for (let i = 2; i <= lines; i++) {
      const y_start_offset = p5.random(size / 4);
      const y_end_offset = p5.random(size / 4);
      p5.bezier(
        p5.random(0, 10),
        y_start + y_start_offset,
        c1.x / i,
        c1.y,
        c2.x / i,
        c2.y,
        p5.random(0, 10),
        y_end - y_end_offset
      );
      p5.bezier(
        -p5.random(0, 10),
        y_start + y_start_offset,
        -c1.x / i,
        c1.y,
        -c2.x / i,
        c2.y,
        -p5.random(0, 10),
        y_end - y_end_offset
      );
    }
  });
}

interface BlossomParams {
  x: number;
  y: number;
  size: number;
  stroke_color: P5.Color;
  petal_color: P5.Color;
}

/**
 * Draws a procedurally-generated flower blossom.
 */
function blossom(p5: P5, params: BlossomParams) {
  const { x, y, size } = params;
  pushpop(p5, () => {
    p5.translate(x, y);
    const scale = size / 300;
    p5.scale(scale, scale);
    p5.stroke(params.stroke_color);

    const petals = p5.ceil(p5.random(5, 7));
    const step = p5.TWO_PI / petals;
    const offset = p5.random(p5.PI * 0.5);
    for (let i = 0; i < petals; i++) {
      pushpop(p5, () => {
        p5.rotate(offset + step * i + p5.random(-step / 4, step / 4));
        petal(p5, { color: params.petal_color });
      });
    }

    // Draw the center of the blossom.
    pushpop(p5, () => {
      p5.noStroke();
      p5.fill(params.stroke_color);
      p5.circle(0, 0, 40);
    });
  });
}

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
