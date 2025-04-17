<script setup lang="ts">
import { useActivePalette, type PaletteItem } from '@/composables/use-active-palette';
import { rgbToHex } from '@/utils/color-space.util';
import { onMounted, ref } from 'vue';

export interface PaletteItemProps {
  palette: PaletteItem
}

const props = defineProps<PaletteItemProps>()

const activePalette = useActivePalette()


const minus = ref<HTMLElement>()
const add = ref<HTMLElement>()
onMounted(() => {
  let minusLastTouchEnd = new Date().getTime();
  minus.value?.addEventListener('touchend', function (event) {
    const now = new Date().getTime();
    if (now - minusLastTouchEnd <= 300) {
      event.preventDefault(); // Prevent double-tap zoom
    }
    minusLastTouchEnd = now;
    activePalette.reduceMix(props.palette)
  }, false);

  let addLastTouchEnd = new Date().getTime();
  add.value?.addEventListener('touchend', function (event) {
    const now = new Date().getTime();
    if (now - addLastTouchEnd <= 300) {
      event.preventDefault(); // Prevent double-tap zoom
    }
    addLastTouchEnd = now;
    activePalette.addMix(props.palette)
  }, false);

})
</script>


<template>
  <div class="palette-item auto-layout vertical top-left">
    <div class="flex-1 w-full hide-mobile"
      :style="{ backgroundColor: rgbToHex(palette.renderValue), borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }">
    </div>
    <div class="auto-layout horizontal justify-between w-full gap-8">
      <div ref="minus" class="palette-control" @click="activePalette.reduceMix(palette)">-</div>
      <div class="auto-layout mobile-only horizontal center gap-8 show-mobile">
        <div :style="{ width: '16px', height: '16px', backgroundColor: rgbToHex(palette.renderValue) }"></div>
        <div :style="{ width: '80px' }">{{ palette.name }}</div>
      </div>
      <div>{{ activePalette.getMixCount(palette) }}</div>
      <div ref="add" class="palette-control" @click="activePalette.addMix(palette)">+</div>
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
