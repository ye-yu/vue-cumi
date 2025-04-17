<script setup lang="ts">
import { useActivePalette } from '@/composables/use-active-palette';
import PaletteItemControl from './PaletteItemControl.vue';


const activePalette = useActivePalette()
</script>

<template>
  <div class="max-w-full-800 auto-layout horizontal top-left" style="flex-wrap: wrap; row-gap: 8px; column-gap: 32px;">
    <template v-for="palette in activePalette.activePalette.palettes" :key="palette.name">
      <PaletteItemControl :palette="palette" />
    </template>
  </div>
</template>

<style lang="css" scoped></style>
