import P5 from "p5";
import { get_current_seed } from "../page";
import { Palette } from "../palette";
import { Assets } from "../assets";
import { SceneParams, Layout, compute_layout, AxisAlignedRect } from "./layout";

export class Sketch {
  public readonly layout: Layout;
  public readonly palette: Palette;
  public readonly assets: Assets;
  private readonly p5: P5;

  public constructor(p5: P5, params: SceneParams) {
    this.layout = compute_layout(params);
    this.palette = new Palette(p5);
    this.assets = new Assets(p5);
    this.p5 = p5;
  }

  /**
   * Fills the sketch margins with rects.
   *
   * The caller must set the fill color prior to calling this method.
   */
  public paint_margins() {
    this.p5.push();
    this.p5.noStroke();
    this.p5.rectMode(this.p5.CORNER);
    // left side
    this.p5.rect(
      this.layout.left,
      this.layout.top,
      this.layout.margin,
      this.layout.h
    );
    // right side
    this.p5.rect(
      this.layout.scene.right,
      this.layout.top,
      this.layout.margin,
      this.layout.h
    );
    // top
    this.p5.rect(
      this.layout.scene.left,
      this.layout.top,
      this.layout.scene.w,
      this.layout.margin
    );
    // bottom
    this.p5.rect(
      this.layout.scene.left,
      this.layout.scene.bottom,
      this.layout.scene.w,
      this.layout.margin
    );
    this.p5.pop();
  }

  draw_seed() {
    this.p5.push();
    this.p5.textAlign(this.p5.RIGHT, this.p5.BOTTOM);
    this.p5.noStroke();
    this.p5.textSize(15);
    const pad = this.p5.textSize() * 0.25;
    this.p5.text(
      `[id:${get_current_seed()}]`,
      this.layout.right - pad,
      this.layout.bottom - pad
    );
    this.p5.pop();
  }
}
