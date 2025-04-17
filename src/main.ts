import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { useActivePalette } from './composables/use-active-palette'
import { generateColorPuzzle } from './composables/use-puzzle-generator'
import { mixColors } from './utils/color-mixer.util'
import { rgbToHex } from './utils/color-space.util'

useActivePalette().init()
createApp(App).mount('#app')

Object.defineProperty(window, 'debugColors', {
  get() {
    return function debugColors(count: number) {
      const date = new Date()
      for (let i = 0; i < count; i++) {
        date.setDate(date.getDate() - 1)
        const { palette, mixes } = generateColorPuzzle(date)
        const color = rgbToHex(mixColors(mixes))
        console.log(`%c${palette.name}: ${date.toLocaleString()} ${mixes.length} colors`, "background:" + color);
      }
    }
  }
})
