<script setup lang="ts">
import { useActivePalette, type PaletteItem } from '@/composables/use-active-palette';
import { rgbToHex } from '@/utils/color-space.util';

export interface PaletteItemProps {
  palette: PaletteItem
}

defineProps<PaletteItemProps>()

const activePalette = useActivePalette()
</script>


<template>
  <div class="palette-item auto-layout vertical top-left">
    <div class="flex-1 w-full hide-mobile"
      :style="{ backgroundColor: rgbToHex(palette.renderValue), borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }">
    </div>
    <div class="auto-layout horizontal justify-between w-full gap-8">
      <div class="palette-control" @click="activePalette.reduceMix(palette)">-</div>
      <div class="auto-layout mobile-only horizontal center gap-8 show-mobile">
        <div :style="{ width: '16px', height: '16px', backgroundColor: rgbToHex(palette.renderValue) }"></div>
        <div :style="{ width: '80px' }">{{ palette.name }}</div>
      </div>
      <div style="width: 24px; text-align: center;">{{ activePalette.getMixCount(palette) }}</div>
      <div class="palette-control" @click="activePalette.addMix(palette)">+</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.palette-item {
  border-radius: 12px;
  width: 80px;
  height: 80px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.25);
  background: #fff;
}

.palette-control {
  width: 24px;
  text-align: center;
  cursor: pointer;
  height: 100%;
  user-select: none;
}

@media (max-width: 650px) {
  .palette-item {
    width: unset;
    height: unset;
  }
}
</style>
