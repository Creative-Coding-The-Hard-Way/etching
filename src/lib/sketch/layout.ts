export interface AxisAlignedRect {
  readonly w: number;
  readonly h: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
  readonly top: number;
  readonly center_x: number;
  readonly center_y: number;
}

export interface Layout extends AxisAlignedRect {
  readonly margin: number;
  readonly scene: AxisAlignedRect;
}

export interface SceneParams {
  width: number;
  height: number;
  margin: number;
}

export function compute_layout(params: SceneParams): Layout {
  const { width, height, margin } = params;
  return {
    margin,
    w: width,
    h: height,
    left: 0,
    right: width,
    top: 0,
    bottom: height,
    center_x: width / 2,
    center_y: height / 2,
    scene: {
      w: width - margin * 2,
      h: height - margin * 2,
      left: margin,
      top: margin,
      right: width - margin,
      bottom: height - margin,
      center_x: width / 2,
      center_y: height / 2,
    },
  };
}
