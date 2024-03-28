import P5 from "p5";
import { pushpop } from "~src/lib/p5_state";

import { Pen } from "~/src/lib/pen";

export interface PetalParams {
  petal_color: P5.Color;
  thick_pen: Pen;
  detail_pen: Pen;
}

/**
 * Draws a single petal.
 *
 * Petals are 150 pixels tall starting from y=0 and ending at y = 150.
 * Orientation and size can be controlled by calling p5.rotate/translate/scale.
 */
export function petal(p5: P5, params: PetalParams) {
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
    p5.fill(params.petal_color);
    pushpop(p5, () => {
      p5.noStroke();
      p5.bezier(0, y_start, c1.x, c1.y, c2.x, c2.y, 0, y_end);
      p5.bezier(0, y_start, -c1.x, c1.y, -c2.x, c2.y, 0, y_end);
    });
    params.thick_pen.bezier(0, y_start, c1.x, c1.y, c2.x, c2.y, 0, y_end);
    params.thick_pen.bezier(0, y_start, -c1.x, c1.y, -c2.x, c2.y, 0, y_end);
  });

  // Detail Lines
  pushpop(p5, () => {
    p5.noFill();
    p5.strokeWeight(1);

    // center line
    params.detail_pen.bezier(
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
      params.detail_pen.bezier(
        p5.random(0, 10),
        y_start + y_start_offset,
        c1.x / i,
        c1.y,
        c2.x / i,
        c2.y,
        p5.random(0, 10),
        y_end - y_end_offset
      );
      params.detail_pen.bezier(
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

export interface BlossomParams {
  x: number;
  y: number;
  size: number;
  stroke_color: P5.Color;
  petal_color: P5.Color;
  petal_count?: number;
  thick_pen: Pen;
  detail_pen: Pen;
}

/**
 * Draws a procedurally-generated flower blossom.
 */
export function blossom(p5: P5, params: BlossomParams) {
  const { x, y, size } = params;
  pushpop(p5, () => {
    p5.translate(x, y);
    const scale = size / 300;
    p5.scale(scale, scale);
    p5.stroke(params.stroke_color);

    const petals = params.petal_count || p5.ceil(p5.random(4, 9));
    const step = p5.TWO_PI / petals;
    const offset = p5.random(p5.PI * 0.5);
    for (let i = 0; i < petals; i++) {
      pushpop(p5, () => {
        p5.rotate(offset + step * i + p5.random(-step / 4, step / 4));
        petal(p5, {
          petal_color: params.petal_color,
          detail_pen: params.detail_pen,
          thick_pen: params.thick_pen,
        });
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
