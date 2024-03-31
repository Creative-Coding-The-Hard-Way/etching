import { Page } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import { Sketch } from "~/src/lib/sketch";
import { Brush } from "~/src/lib/brush";
import P5 from "p5";

new Page("Pen", (p5: P5) => {
  const sketch = new Sketch(p5, {
    width: 800,
    height: 1000,
    margin: p5.random(25, 200),
  });
  const { w, h, scene } = sketch.layout;
  const ink_pen = new Brush(p5, {
    size_jitter: 0.5,
    position_jitter: 0.25,
    angle_jitter: 0.1,
    spacing: 0.25,
    stamp: {
      draw: (p5: P5) => {
        p5.rectMode(p5.CENTER);

        p5.noStroke();
        p5.fill(0, 128);
        p5.rect(0, 0, 50, 100);

        p5.fill(0, 228);
        p5.rect(0, 0, 100, 25);

        if (p5.random() > 0.99) {
          p5.scale(2, 2);
          p5.fill(0, 128);
          p5.rect(0, 0, 50, 100);

          p5.fill(0, 228);
          p5.rect(0, 0, 100, 25);

          if (p5.random() > 0.9) {
            p5.scale(2, 2);
            p5.fill(0, 128);
            p5.rect(0, 0, 50, 100);

            p5.fill(0, 228);
            p5.rect(0, 0, 100, 25);
          }
        }
      },
      size: 100,
    },
  });

  p5.preload = () => sketch.assets.load_special_elite();
  p5.setup = () => p5.createCanvas(w, h);
  p5.mouseClicked = () => p5.redraw();

  p5.draw = () => {
    p5.background(sketch.palette.old_paper());

    pushpop(p5, () => {
      p5.noStroke();
      p5.fill(0, 48);
      p5.rect(scene.left, scene.top, scene.w, scene.h);
    });

    pushpop(p5, () => {
      p5.stroke(sketch.palette.gunmetal());
      ink_pen.set_size(8);
      ink_pen.line(scene.left, scene.center_y, p5.mouseX, p5.mouseY);
    });

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
