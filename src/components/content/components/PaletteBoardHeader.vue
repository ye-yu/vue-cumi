<script setup lang="ts">
import { useActivePalette } from '@/composables/use-active-palette';

const activePalette = useActivePalette();

function onChange(value: Event) {
  const target = value.target as HTMLSelectElement
  const paletteName = target.value;
  const found = activePalette.palettes.find(e => e.name === paletteName)
  if (!found) return;
  activePalette.activePalette = found;
}

</script>

<template>
  <div class="w-full auto-layout vertical top-left gap-16-mobile gap-0">
    <div class="auto-layout horizontal left" style="flex-wrap: wrap; row-gap: 0px; column-gap: 32px;">
      <div class="header-title">Palette</div>
      <select id="select-palette" :value="activePalette.activePalette.name" @change="onChange">
        <option v-for="option in activePalette.palettes" :key="option.name" :value="option.name">
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="caption">
      Edit your mixing below (add/remove colors) or select a new palette above.
    </div>
  </div>
</template>

<style lang="css" scoped>
.header-title {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 24px;
  color: #494949;
}

.header-select-palette {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.03em;
  color: #808080;
}

select {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.03em;
  color: #808080;
  border: 0;
  text-align: left;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23808080" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  padding: 0;
}

select:focus {
  border-color: #F7F7F7;
  outline: none;
}

.caption {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: #808080;
}
</style>
