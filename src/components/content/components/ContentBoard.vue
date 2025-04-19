<script setup lang="ts">
import { useActivePalette } from '@/composables/use-active-palette';
import { usePuzzleGenerator } from '@/composables/use-puzzle-generator';
import { computed } from 'vue';
import { compareSimilarity } from '@/utils/color-space-compare.util';
import { rgbToHex } from '@/utils/color-space.util';
import ContentColorCompare from './ContentColorCompare.vue';



const activePalette = useActivePalette();
const puzzleGenerator = usePuzzleGenerator();
const todaysChallenge = computed(() => puzzleGenerator.puzzle);
const mixResult = computed(() => activePalette.mixResult);

const similarity = computed(() => mixResult.value ? compareSimilarity(todaysChallenge.value, mixResult.value).toFixed(2) : '0')

</script>

<template>
  <ContentColorCompare :source="mixResult ? rgbToHex(mixResult) : null" :mixes="activePalette.mixes.length"
    :similarity="similarity" :target="rgbToHex(todaysChallenge)" />
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
