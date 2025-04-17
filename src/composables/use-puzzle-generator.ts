import { seededRandom } from "@/utils/seeded-random.util";
import { useActivePalette } from "./use-active-palette";
import { mixColors } from "@/utils/color-mixer.util";
import { computed } from "vue";

function getClientLocale() {
  if (typeof Intl !== 'undefined') {
    try {
      return Intl.NumberFormat().resolvedOptions().locale;
    } catch (err: unknown) {
      console.error("Cannot get locale from Intl", err)
    }
  }
}

const generateColorPuzzle = () => {
  const date = new Date()
  const seed = [
    getClientLocale(),
    date.getDay(),
    date.getMonth(),
    date.getFullYear(),
  ].join('')

  const random = seededRandom(seed)

  const minMix = 4
  const maxMix = 8
  const mixCount = random.nextInt(minMix, maxMix)


  const palettes = useActivePalette().palettes;
  const palette = random.nextItem(palettes);


  const mixes = Array.from({ length: mixCount }).map(() => random.nextItem(palette.palettes).value)

  return mixColors(mixes)
}


const todaysPuzzle = computed(generateColorPuzzle);
export function usePuzzleGenerator() {
  return {
    get puzzle() {
      return todaysPuzzle.value
    }
  }
}
