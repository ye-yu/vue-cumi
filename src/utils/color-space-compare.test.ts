import { compareSimilarity } from "./color-space-compare.util.ts";
import { rgbToHex, type RGB } from "./color-space.util.ts";

const random: RGB = {
  r: 102,
  g: 53,
  b: 65,
}


const shade1: RGB = {
  r: 90,
  g: 53,
  b: 65,
}

const shade2: RGB = {
  r: 95,
  g: 53,
  b: 65,
}

function logCompare(left: RGB, right: RGB) {
  const compare = compareSimilarity(left, right)

  console.log(`${rgbToHex(left)} vs ${rgbToHex(right)}`, compare)

}


logCompare(random, shade1)
logCompare(random, shade2)
