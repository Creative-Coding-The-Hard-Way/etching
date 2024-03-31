import P5 from "p5";
import { pushpop } from "./p5_state";

/**
 * Brushes draw repeated stamps to create strokes on the canvas.
 */
export interface Stamp {
  /**
   * Draw a single brush stamp centered at position 0, 0.
   * @param p5 the P5 library instance.
   */
  draw: (p5: P5) => void;

  /**
   * The characteristic size of the stamp.
   *
   * If the stamp is a perfect circle, then the size would be the diameter
   * of that circle.
   */
  readonly size: number;
}

export interface BrushProps {
  /**
   * The brush stamp to use.
   */
  stamp: Stamp;

  /**
   * A number in the range [0.1, 1] that controls spacing between stamps as a
   * percentage of brush size.
   */
  spacing: number;

  /**
   * A number in the range [0, 1] that controls how much the brush size changes
   * between stamps as a % of brush size.
   */
  size_jitter: number;

  /**
   * A number in the range [0, 1] that controls how much the stamp position
   * changes between stamps as a % of brush size.
   */
  position_jitter: number;

  /**
   * A number in the range [0, 1] that controls how much the stamp angle
   * varies between each stamp.
   */
  angle_jitter: number;
}

export class Brush {
  private readonly p5: P5;
  private readonly props: BrushProps;
  private brush_size: number;

  constructor(p5: P5, props: BrushProps) {
    this.p5 = p5;
    this.props = props;
    this.brush_size = 1;
  }

  public set_size(brush_size: number) {
    this.brush_size = brush_size;
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    const line_angle = Math.atan2(y2 - y1, x2 - x1);
    const max_len = this.p5.dist(x1, y1, x2, y2);
    let remaining_len = max_len;
    while (remaining_len >= 0) {
      const n = 1.0 - remaining_len / max_len;
      const stamp_size =
        this.brush_size * (1 + this.jitter(this.props.size_jitter));

      const offset = this.position_jitter(line_angle, stamp_size);
      const x = this.p5.lerp(x1, x2, n) + offset.x;
      const y = this.p5.lerp(y1, y2, n) + offset.y;

      pushpop(this.p5, () => {
        this.p5.translate(x, y);
        this.p5.rotate(
          line_angle + this.p5.TWO_PI * this.jitter(this.props.angle_jitter)
        );
        const s = stamp_size / this.props.stamp.size;
        this.p5.scale(s, s);
        this.props.stamp.draw(this.p5);
      });

      remaining_len -= stamp_size * Math.max(0.1, this.props.spacing);
    }
  }

  private jitter(range: number): number {
    const h = range * 0.5;
    return this.p5.random(-h, h);
  }

  private position_jitter(
    line_angle: number,
    stamp_size: number
  ): { x: number; y: number } {
    const angle = line_angle + this.p5.HALF_PI;
    const r = stamp_size * this.jitter(this.props.position_jitter);
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    };
  }
}
