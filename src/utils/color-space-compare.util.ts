import { rgb2lab, type LAB, type RGB } from "./color-space.util.ts";

// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs
export function deltaE(labA: LAB, labB: LAB) {
  const deltaL = labA.l - labB.l;
  const deltaA = labA.a - labB.a;
  const deltaB = labA.b - labB.b;
  const c1 = Math.sqrt(labA.a * labA.a + labA.b * labA.b);
  const c2 = Math.sqrt(labB.a * labB.a + labB.b * labB.b);
  const deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / (1.0);
  const deltaCkcsc = deltaC / (sc);
  const deltaHkhsh = deltaH / (sh);
  const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}


export function perceptualSimilarity(deltaE: number): number {
  // Use a logarithmic function to map deltaE to a perceptual similarity percentage.
  // The function is designed to:
  // - Return 100% when deltaE is close to 0.
  // - Approach 0% as deltaE increases.
  //
  // The constants 5 and 0.1 are chosen to tune the shape of the curve.  You can
  // adjust these to change how quickly the similarity decreases with increasing
  // deltaE.

  const similarity = 100 * Math.exp(-deltaE / 20); //tune this
  return Math.max(0, Math.min(100, similarity)); // Ensure the result is within 0-100%
}

export function compareSimilarity(left: RGB, right: RGB) {
  const leftLAB = rgb2lab(left)
  const rightLAB = rgb2lab(right)
  const delta = deltaE(leftLAB, rightLAB)
  return perceptualSimilarity(delta)
}
