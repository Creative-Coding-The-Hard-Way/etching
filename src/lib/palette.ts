import P5 from "p5";

export class Palette {
  private p5: P5;

  constructor(p5: P5) {
    this.p5 = p5;
  }

  old_paper(): P5.Color {
    return this.p5.color("#E0C9A6");
  }

  gunmetal(): P5.Color {
    return this.p5.color("#2E2F2E");
  }
}
