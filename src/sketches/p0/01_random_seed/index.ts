import { Page, get_current_seed } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import P5 from "p5";

new Page("Random Seed", (p5: P5) => {
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
      p5.circle(p5.random(w), p5.random(h), 200);
    });

    pushpop(p5, () => {
      p5.stroke(palette.gunmetal());
      const seed = `[id:${get_current_seed()}]`;
      const text_width = p5.textWidth(seed) + p5.textSize();
      p5.text(seed, w - text_width, h - p5.textSize());
    });

    p5.noLoop();
  };
});

export {};
