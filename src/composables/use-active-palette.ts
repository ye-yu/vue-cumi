import { type RGB } from "@/utils/color-space.util"
import { tagString, useLocalStorage } from "./use-local-storage"
import { computed, ref } from "vue"
import { mixColors } from "@/utils/color-mixer.util"

export class PaletteGroup {
  constructor(
    readonly name: string,
    readonly palettes: [PaletteItem, ...PaletteItem[]]
  ) {
    if (!palettes.length) {
      throw new Error(`Palette for ${name} is empty.`)
    }
  }
}

export class PaletteItem {
  constructor(
    readonly name: string,
    readonly value: RGB,
    readonly renderValue: RGB,
  ) { }
}

const standardRGBBW = new PaletteGroup(
  'Standard RGB + BW',
  [
    new PaletteItem('Red',
      { r: 255, g: 0, b: 0 },
      { r: 239, g: 26, b: 65 }),
    new PaletteItem('Green',
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 106 }),
    new PaletteItem('Blue',
      { r: 0, g: 0, b: 255 },
      { r: 35, g: 97, b: 244 }),
    new PaletteItem('Black',
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0 }),
    new PaletteItem('White',
      { r: 255, g: 255, b: 255 },
      { r: 247, g: 247, b: 247 }),
  ],
)

const cymkwPalette = new PaletteGroup(
  'Cyan Yellow Magenta + Black White',
  [
    new PaletteItem('Cyan',
      { r: 0, g: 255, b: 255 },
      { r: 0, g: 229, b: 234 }),
    new PaletteItem('Yellow',
      { r: 255, g: 255, b: 0 },
      { r: 247, g: 238, b: 0 }),
    new PaletteItem('Magenta',
      { r: 255, g: 0, b: 255 },
      { r: 230, g: 0, b: 255 }),
    new PaletteItem('Black',
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0 }),
    new PaletteItem('White',
      { r: 255, g: 255, b: 255 },
      { r: 247, g: 247, b: 247 }),
  ],
)


const activePaletteKey = tagString<PaletteGroup>('activePaletteKey');
const activeMixKey = tagString<Record<string, number>>('activeMixKey');
const activePalette = ref(standardRGBBW)
const activeMix = ref({} as Record<string, number>)

const mixDescription = computed(() => Object.keys(activeMix.value).flatMap((e) => {
  const palette = activePalette.value.palettes.find(p => p.name === e);
  const count = activeMix.value[e] ?? 0;
  if (!palette || !count) return []
  return [
    `${palette.name}: ${count}`
  ]
}))

const mixes = computed(() => Object.keys(activeMix.value).flatMap((e) => {
  const palette = activePalette.value.palettes.find(p => p.name === e)?.value;
  const count = activeMix.value[e] ?? 0;
  if (!palette || !count) return []
  return Array.from({ length: count }).map(() => palette)
}))

const mixResult = computed(() => mixes.value.length ? mixColors(mixes.value) : null)
export function useActivePalette() {
  const storage = useLocalStorage()

  return {
    init() {
      activePalette.value = storage.get(activePaletteKey) ?? standardRGBBW;
      activeMix.value = storage.get(activeMixKey) ?? {};
    },
    get activePalette(): PaletteGroup {
      return activePalette.value
    },
    set activePalette(value: PaletteGroup) {
      activePalette.value = value
      storage.set(activePaletteKey, value)
      this.resetMix()
    },
    get palettes() {
      return [
        standardRGBBW,
        cymkwPalette,
      ]
    },
    get mixes() {
      return mixes.value
    },
    get mixDescription() {
      return mixDescription.value
    },
    get mixResult() {
      return mixResult.value
    },
    resetMix() {
      activeMix.value = {}
      storage.set(activeMixKey, activeMix.value)
    },
    addMix(palette: PaletteItem) {
      activeMix.value[palette.name] ??= 0
      activeMix.value[palette.name] += 1
      storage.set(activeMixKey, activeMix.value)
    },
    reduceMix(palette: PaletteItem) {
      activeMix.value[palette.name] ??= 0
      activeMix.value[palette.name] -= 1
      activeMix.value[palette.name] = Math.max(0, activeMix.value[palette.name])
      storage.set(activeMixKey, activeMix.value)
    },
    getMixCount(palette: PaletteItem) {
      return activeMix.value[palette.name] ?? 0
    },
  }
}
