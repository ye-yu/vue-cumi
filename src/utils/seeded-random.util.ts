export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // A simple pseudo-random number generation algorithm (Linear Congruential Generator - LCG)
  private nextSeed(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % Number.MAX_SAFE_INTEGER;
    return this.seed;
  }

  random(): number {
    return this.nextSeed() / Number.MAX_SAFE_INTEGER;
  }

  nextInt(min: number, max: number): number {
    const range = max - min;
    if (range <= 0) {
      throw new Error("Invalid range for nextInt: max must be greater than min.");
    }
    return min + Math.floor(this.random() * range);
  }

  nextItem<T>(array: T[]): T {
    const index = this.nextInt(0, array.length)
    return array[index]
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

  const seedForRandom = new SeededRandom(seed)
  return new SeededRandom(seedForRandom.nextInt(0, Number.MAX_SAFE_INTEGER))
}
