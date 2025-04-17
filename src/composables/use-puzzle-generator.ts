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

export const generateColorPuzzle = (date: Date) => {
  const seed = [
    getClientLocale(),
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ].join('')

  const seedToRandom = seededRandom(seed)
  seedToRandom.random()
  const random = seededRandom(seedToRandom.random() * Number.MAX_SAFE_INTEGER)

  const minMix = 4
  const maxMix = 12
  const mixCount = random.nextInt(minMix, maxMix)


  const palettes = useActivePalette().palettes;
  const palette = random.nextItem(palettes);


  const paletteMixes = Array.from({ length: mixCount }).map(() => random.nextItem(palette.palettes))
  const mixes = paletteMixes.map(e => e.value)
  const paletteCount = paletteMixes.reduce((a, b) => {
    a[b.name] ??= 0
    a[b.name] += 1
    return a
  }, {} as Record<string, number>)

  return {
    palette,
    paletteCount,
    mixes,
  }
}


const todaysPuzzle = computed(() => generateColorPuzzle(new Date()));
const yesterdaysPuzzle = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() - 1)
  return generateColorPuzzle(date)
});
export function usePuzzleGenerator() {
  return {
    get puzzle() {
      return mixColors(todaysPuzzle.value.mixes)
    },
    get yesterdaysPuzzle() {
      return yesterdaysPuzzle.value
    }
  }
}
