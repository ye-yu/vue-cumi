<script setup lang="ts">
import { rgbToHex, type RGB } from '@/utils/color-space.util';

defineProps<{
  color: RGB | null
  descriptions: string[]
  short?: boolean
}>()
</script>

<template>
  <div class="auto-layout vertical top-center gap-4 w-full">
    <div :class="['color-board auto-layout horizontal center', { 'color-board-short': short }]"
      :style="{ background: color ? rgbToHex(color) : undefined }">
      <span class="what" v-if="!color">?</span>
    </div>
    <div class="color-description">
      <span v-for="(text, index) in descriptions" :key="index">{{ text }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.what {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 80px;
  text-align: center;
  color: #EEE;
}

.color-board {
  border-radius: 16px;
  height: 180px;
  width: 100%;
}

.color-board-short {
  height: 80px;
}

.color-description {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: #808080;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4px
}
</style>
