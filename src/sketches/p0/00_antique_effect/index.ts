import { Page } from "~/src/lib/page";
import { scribble } from "~/src/lib/effects";
import { pushpop } from "~/src/lib/p5_state";
import P5 from "p5";

function sketch(p5: P5) {
  const w = 800;
  const h = 1000;
  const palette = {
    old_paper: () => p5.color("#E0C9A6"),
    gunmetal: () => p5.color("#2E2F2E"),
  };

  p5.setup = () => {
    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    p5.background(palette.old_paper());
    p5.noFill();

    pushpop(p5, () => {
      p5.stroke(palette.gunmetal());
      p5.strokeWeight(10);
      p5.circle(w / 2, h / 2, 200);
      p5.circle(w / 2 + 75, h / 2, 200);
      p5.circle(w / 2 - 75, h / 2, 200);
    });

    pushpop(p5, () => {
      let c = palette.gunmetal();
      c.setAlpha(15);
      p5.stroke(c);
      p5.strokeWeight(0.5);
      scribble(p5, {
        width: w,
        height: h,
        line_count: 200,
      });
    });

    p5.noLoop();
  };
}
new Page("Antique Effect", sketch);

export {};
