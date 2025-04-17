import { seededRandom, SeededRandom } from "./seeded-random.util.ts";

function testRandomDistribution(generator: SeededRandom, min: number, max: number, numSamples: number, numBins: number): void {
  const range = max - min;
  const binSize = range / numBins;
  const bins = Array.from<number>({ length: numBins }).fill(0);

  // Generate random numbers and count occurrences in each bin
  for (let i = 0; i < numSamples; i++) {
    const randomNumber = generator.nextInt(min, max);
    const binIndex = Math.floor((randomNumber - min) / binSize);
    // Handle the case where randomNumber is exactly max (should fall in the last bin)
    if (binIndex >= 0 && binIndex < numBins) {
      bins[binIndex]++;
    } else if (randomNumber === max && numBins > 0) {
      bins[numBins - 1]++;
    }
  }

  // Calculate expected count per bin
  const expectedCount = numSamples / numBins;

  // Calculate Chi-squared statistic
  let chiSquared = 0;
  for (const observedCount of bins) {
    chiSquared += Math.pow(observedCount - expectedCount, 2) / expectedCount;
  }

  // Degrees of freedom
  const degreesOfFreedom = numBins - 1;

  // You would typically compare the chiSquared value to a critical value
  // from the Chi-squared distribution table for a chosen significance level (e.g., 0.05).
  // For simplicity, we will just print the chi-squared value and the expected count.

  console.log(`Distribution Test Results (Range: ${min}-${max}, Samples: ${numSamples}, Bins: ${numBins}):`);
  console.log(`Expected count per bin: ${expectedCount}`);
  console.log("Observed counts per bin:", bins);
  console.log("Chi-squared statistic:", chiSquared);
  console.log("Degrees of freedom:", degreesOfFreedom);

  // Interpretation (simplified):
  // A smaller Chi-squared value generally indicates a better fit to the expected distribution.
  // A larger value suggests a significant deviation.
  // To make a statistical conclusion, you would compare the chi-squared value
  // to a critical value from a chi-squared distribution table based on the
  // degrees of freedom and your desired significance level.
}

// Example usage:
const usingSeed = crypto.randomUUID();
console.log("Using seed", usingSeed)
const generator = seededRandom(usingSeed);
const minRange = 0;
const maxRange = 100;
const numberOfSamples = 10000;
const numberOfBins = 10;

testRandomDistribution(generator, minRange, maxRange, numberOfSamples, numberOfBins);
