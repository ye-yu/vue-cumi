<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import ContentBoard from './ContentBoard.vue';
import { getDaysAfterRelease } from '@/utils/date.util';
import { shareResult } from '@/utils/share-result.util';
import { usePuzzleGenerator } from '@/composables/use-puzzle-generator';
import { useActivePalette } from '@/composables/use-active-palette';
import { compareSimilarity } from '@/utils/color-space-compare.util';
import { computed, ref } from 'vue';
import { mixColors } from '@/utils/color-mixer.util';
import { rgbToHex } from '@/utils/color-space.util';
import { useMixHistory } from '@/composables/use-mix-history';
import MixSummary from './MixSummary.vue';

const activePalette = useActivePalette();
const puzzleGenerator = usePuzzleGenerator();
const mixHistory = useMixHistory()
const yesterdaysUserMix = computed(() => mixHistory.yesterdaysMix);
const yesterdaysUserMixResult = computed(() => {
  const palette = activePalette.palettes.find(e => e.name === yesterdaysUserMix.value?.name)
  const mixes = yesterdaysUserMix.value?.mixes ?? {}
  if (!palette) return null
  const mixesExpanded = Object.keys(mixes).flatMap((name) => {
    const paletteItem = palette.palettes.find(e => e.name === name)
    const count = mixes[name] ?? 0
    if (!paletteItem) return []
    return Array.from({ length: count }).map(() => paletteItem.value)
  })
  if (!mixesExpanded.length) return null;
  return mixColors(mixesExpanded)
})

const yesterdaysPuzzle = computed(() => puzzleGenerator.yesterdaysPuzzle)
const yesterdaysMix = computed(() => mixColors(yesterdaysPuzzle.value.mixes))
function share() {
  const todaysChallenge = puzzleGenerator.puzzle;
  const mixResult = activePalette.mixResult;
  const similarity = mixResult ? compareSimilarity(todaysChallenge, mixResult).toFixed(2) : '0'
  shareResult({
    todaysChallenge: todaysChallenge,
    mixCount: activePalette.mixes.length,
    similarity: similarity
  })
}

function showYesterdaysResult() {
  dialog.value?.showModal()
}

const dialog = ref<HTMLDialogElement>()
</script>

<template>
  <div class="max-w-full-800 p-16-tablet auto-layout vertical top-center gap-32">
    <div class="auto-layout vertical top-center w-full">
      <div class="todays-challenge">Today's challenge #{{ getDaysAfterRelease() }}</div>
      <div class="todays-challenge-caption">Reach a 100% match</div>
    </div>
    <div class="auto-layout vertical top-left gap-4 w-full">
      <div class="how-good">How good is your color matching skill?</div>
      <div class="how-good-caption">Test your color perception! Each day, a unique color is randomly selected from the
        preset palettes and displayed on the right. Your objective is to replicate it precisely and reach a 100% match.
        Ready to play?</div>
    </div>
    <ContentBoard />
    <div class="auto-layout horizontal center gap-24">
      <AppButton label="Share result" icon="ios_share" @click="share" />
      <AppButton label="Yesterday's result" icon="crown" @click="showYesterdaysResult" />
    </div>
  </div>
  <dialog ref="dialog" class="fade-in">
    <div class="auto-layout vertical top-center gap-32" style="padding: 8px 12px">
      <div class="dialog-title">
        Result #{{ getDaysAfterRelease() - 1 }}
      </div>
      <MixSummary :color="yesterdaysMix" :descriptions="[rgbToHex(yesterdaysMix)]" :name="yesterdaysPuzzle.palette.name"
        :mixes="yesterdaysPuzzle.paletteCount" />
      <div class="w-full auto-layout vertical left gap-12" v-if="yesterdaysUserMix && yesterdaysUserMixResult">
        <div class="dialog-subtitle w-full">
          Your mix
        </div>
        <MixSummary :color="yesterdaysUserMixResult" :descriptions="[rgbToHex(yesterdaysUserMixResult)]"
          :name="yesterdaysUserMix.name" :mixes="yesterdaysUserMix.mixes" />
        <div class="todays-challenge-caption">
          Similarity:
          <span style="font-weight: 700;">
            {{ compareSimilarity(yesterdaysUserMixResult, yesterdaysMix).toFixed(2) }}%
          </span>
        </div>
      </div>
      <div class="auto-layout horizontal right w-full">
        <AppButton label="Close" @click="dialog?.close()" />
      </div>
    </div>
  </dialog>
</template>


<style lang="css" scoped>
.todays-challenge {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 32px;
  text-align: center;
  color: #494949;
}

.todays-challenge-caption {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #808080;
}

.how-good {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 24px;
  text-align: left;
  color: #494949;
}

.how-good-caption {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: #808080;
}
</style>
