import { Page, get_current_seed } from "~/src/lib/page";
import { pushpop } from "~/src/lib/p5_state";
import P5 from "p5";

interface DrawSeedParams {
  position: [number, number];
  text_color: P5.Color;
  font: P5.Font;
}

function draw_seed(p5: P5, params: DrawSeedParams) {
  const [x, y] = params.position;
  p5.push();
  p5.textAlign(p5.RIGHT, p5.BOTTOM);
  p5.noStroke();
  p5.fill(params.text_color);
  p5.textFont(params.font);
  p5.textSize(15);
  const pad = p5.textSize() * 0.25;
  p5.text(`[id:${get_current_seed()}]`, x - pad, y - pad);
  p5.pop();
}

new Page("Random Seed", (p5: P5) => {
  const w = 800;
  const h = 1000;
  const palette = {
    old_paper: () => p5.color("#E0C9A6"),
    gunmetal: () => p5.color("#2E2F2E"),
  };
  const typewriter_font = p5.loadFont("/assets/fonts/SpecialElite.ttf");

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

    draw_seed(p5, {
      position: [w, h],
      text_color: palette.gunmetal(),
      font: typewriter_font,
    });

    p5.noLoop();
  };
});

export {};
