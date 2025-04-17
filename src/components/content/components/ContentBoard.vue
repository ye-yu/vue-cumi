<script setup lang="ts">
import { useActivePalette } from '@/composables/use-active-palette';
import { usePuzzleGenerator } from '@/composables/use-puzzle-generator';
import { computed } from 'vue';
import ContentColor from './ContentColor.vue';
import { compareSimilarity } from '@/utils/color-space-compare.util';
import { rgbToHex } from '@/utils/color-space.util';



const activePalette = useActivePalette();
const puzzleGenerator = usePuzzleGenerator();
const todaysChallenge = computed(() => puzzleGenerator.puzzle);
const mixResult = computed(() => activePalette.mixResult);
const mixDescription = computed(() => activePalette.mixDescription)

const similarity = computed(() => mixResult.value ? compareSimilarity(todaysChallenge.value, mixResult.value).toFixed(2) : '0')

</script>

<template>
  <div class="auto-layout horizontal top-center items-stretch w-full gap-8-mobile gap-32 " style="align-items: stretch;">
    <ContentColor :color="mixResult" :descriptions="mixDescription" />
    <div class="auto-layout vertical top-center similarity" style="padding-top: 80px;">
      <div>-></div>
      <div>
        {{ similarity }}%
      </div>
    </div>
    <ContentColor :color="todaysChallenge" :descriptions="[rgbToHex(todaysChallenge)]" />
  </div>
</template>


<style lang="css" scoped>
.similarity {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: #808080;
  width: 120px;
}
</style>
