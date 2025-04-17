export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // A simple pseudo-random number generation algorithm (Linear Congruential Generator - LCG)
  private nextSeed(): number {
    this.seed = (this.seed * 1103515245 + 12345) % 2147483648;
    return this.seed;
  }

  random(): number {
    return this.nextSeed() / 2147483647;
  }

  nextInt(min: number, max: number): number {
    const range = max - min;
    if (range <= 0) {
      throw new Error("Invalid range for nextInt: max must be greater than min.");
    }
    return min + Math.floor(this.random() * range);
  }

  nextItem<T>(array: T[]): T {
    return array[this.nextInt(0, array.length)]
  }
}

export function seededRandom(seed: number | string) {
  if (typeof seed === 'string') {
    let s = 0;
    for (const c of seed) {
      s += c.codePointAt(0) ?? 0
    }
    seed = s;
  }
  return new SeededRandom(seed)
}
