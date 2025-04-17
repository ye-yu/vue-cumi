<script setup lang="ts">
import { rgbToHex, type RGB } from '@/utils/color-space.util';
import ContentColor from './ContentColor.vue';

defineProps<{
  color: RGB
  descriptions: string[]
  name: string
  mixes: Record<string, number>
}>()

</script>

<template>
  <div class="auto-layout vertical top-left gap-12 w-full">
    <ContentColor short :color="color" :descriptions="[rgbToHex(color)]" />
    <div class="auto-layout vertical top-left gap-0 w-full">
      <div class="mix-summary-caption">Palette:
        <span style="font-weight: 700;">
          {{ name }}
        </span>
      </div>
      <div class="mix-summary-caption" v-for="(count, palette) in mixes" :key="palette">
        {{ palette }}: <span style="font-weight: 700;">{{ count }}</span>
      </div>
    </div>
  </div>
</template>


<style lang="css" scoped>
.mix-summary-caption {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #808080;
}
</style>
