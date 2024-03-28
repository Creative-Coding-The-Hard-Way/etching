import P5 from "p5";
import { pushpop } from "./p5_state";

export interface PenProps {
  jitter: number;
  weight: number;
}

export class Pen {
  private p5: P5;
  private readonly props: PenProps;

  constructor(p5: P5, props: PenProps) {
    this.p5 = p5;
    this.props = props;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    pushpop(this.p5, () => {
      const max_len = this.p5.dist(x1, y1, x2, y2);
      let remaining_len = max_len;
      while (remaining_len >= 0) {
        const n = 1.0 - remaining_len / max_len;
        const point_size =
          this.props.weight *
          this.p5.random(1 - this.props.jitter, 1 + this.props.jitter);

        this.p5.strokeWeight(point_size);
        this.p5.point(
          this.p5.lerp(x1, x2, n) +
            this.p5.random(-point_size, point_size) * this.props.jitter * 0.3,
          this.p5.lerp(y1, y2, n) +
            this.p5.random(-point_size, point_size) * this.props.jitter * 0.3
        );

        remaining_len -= point_size * 0.5;
      }
    });
  }

  bezier(
    x1: number,
    y1: number,
    c1x: number,
    c1y: number,
    c2x: number,
    c2y: number,
    x2: number,
    y2: number
  ) {
    pushpop(this.p5, () => {
      const subdivisions = 30;
      for (let i = 0; i < subdivisions; i++) {
        const n = i / subdivisions;
        const n_next = (i + 1) / subdivisions;

        this.line(
          this.p5.bezierPoint(x1, c1x, c2x, x2, n),
          this.p5.bezierPoint(y1, c1y, c2y, y2, n),
          this.p5.bezierPoint(x1, c1x, c2x, x2, n_next),
          this.p5.bezierPoint(y1, c1y, c2y, y2, n_next)
        );
      }
    });
  }
}
