import P5 from "p5";

const ASSET_PATH = "/etching/assets";

function font_path(font_name: string): string {
  return `${ASSET_PATH}/fonts/${font_name}`;
}

/**
 * Represents Assets in the assets folder.
 *
 * Individual assets are lazily loaded and can be preloaded synchronously in
 * a sketches preload() method if desired.
 */
export class Assets {
  private p5: P5;
  private special_elite: P5.Font | null = null;

  constructor(p5: P5) {
    this.p5 = p5;
  }

  /**
   * Lazily loads the SpecialElite font from the assets folder.
   *
   * Call this once in preload to ensure the font is loaded in your sketch.
   *
   * @returns The P5 font instance for the SpecialElite font face.
   */
  load_special_elite(): P5.Font {
    if (this.special_elite == null) {
      this.special_elite = this.p5.loadFont(font_path("SpecialElite.ttf"));
    }
    return this.special_elite;
  }

  load_image(asset_path: string): P5.Image {
    return this.p5.loadImage(`${ASSET_PATH}/${asset_path}`);
  }
}
