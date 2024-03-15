import P5 from "p5";

export interface ScribbleProps {
  width: number;
  height: number;
  line_count: number;
}

/**
 * Scribble bezier curves all over a region of the canvas.
 *
 * @param p5 - the p5 library instance.
 * @param props - named properties that control the scribble region.
 */
export function scribble(p5: P5, props: ScribbleProps) {
  const { width, height, line_count } = props;
  const lines = line_count;

  for (let i = 0; i < lines; i++) {
    let l = [0, p5.random(height)];
    let r = [width, p5.random(height)];
    p5.bezier(
      l[0], // start
      l[1],
      p5.random(width), // c1
      p5.random(height),
      p5.random(width), // c2
      p5.random(height),
      r[0], // end
      r[1]
    );

    let t = [p5.random(width), 0];
    let b = [p5.random(width), height];
    p5.bezier(
      t[0], // start
      t[1],
      p5.random(width), // c1
      p5.random(height),
      p5.random(width), // c2
      p5.random(height),
      b[0], // end
      b[1]
    );
  }
}
