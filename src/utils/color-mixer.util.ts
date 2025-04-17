import type { RGB } from "./color-space.util";

export function mixColors(rgbs: RGB[]): RGB {
  if (!rgbs || rgbs.length === 0) {
    throw new Error(`Empty colors`);
  }

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  for (const rgb of rgbs) {
    totalR += rgb.r;
    totalG += rgb.g;
    totalB += rgb.b;
  }

  const averageR = totalR / rgbs.length;
  const averageG = totalG / rgbs.length;
  const averageB = totalB / rgbs.length;

  return {
    r: Math.min(255, Math.round(averageR)),
    g: Math.min(255, Math.round(averageG)),
    b: Math.min(255, Math.round(averageB)),
  };
}
