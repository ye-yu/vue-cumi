<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import { ref } from 'vue';

defineProps<
  {
    source?: string | null
    mixes: number
    similarity: string
    target: string
  }
>()


const dialog = ref<HTMLDialogElement>()

</script>


<template>

  <div class="compare-container w-full auto-layout vertical" :style="{
    background: `linear-gradient(to right, ${source ?? 'white'} 50%, ${target} 50%)`,
  }">
    <div class="similarity auto-layout horizontal center gap-4">
      <div style="cursor: pointer; width: 16px; height: 16px">
        <i class="material-symbols-outlined small"
          style="font-size: 12px; color: lightgray; touch-action: manipulation;" @click="dialog?.showModal()">help</i>
      </div>
      <div>{{ similarity }} %</div>
    </div>
    <div class="compare-left-right auto-layout horizontal w-full">
      <div class="flex-1 auto-layout horizontal center">
        <div class="left">Mixes: {{ mixes }}</div>
      </div>
      <div class="flex-1 auto-layout horizontal center">
        <div class="right">{{ target }}</div>
      </div>
    </div>
  </div>

  <dialog ref="dialog" class="fade-in">
    <div class="auto-layout vertical top-center gap-32" style="padding: 8px 12px">
      <div class="dialog-title">
        How it is calculated
      </div>
      <div class="dialog-typo">
        <b>Color similarity</b> is measured based on perceptual differences using the CIELAB color delta formula. Both
        your
        selected color and the target color are converted into the CIELAB color space, and their difference is
        calculated. This difference is then mapped to a scale from <b>0%</b> (completely different) to <b>100%</b> (a
        perfect match).
      </div>
      <div class="dialog-typo">
        <p>References:</p>
        <ul style="padding-inline-start: 20px;">
          <li>
            <a href="https://github.com/antimatter15/rgb-lab">antimatter15/rgb-lab</a>: Conversion to RGB to LAB, and
            LAB distance formula
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Color_difference">Wikipedia:</a> Color difference
          </li>
        </ul>
      </div>
      <div class="dialog-typo w-full">
        <i>Yes, I cite wikipedia as a reference.</i>
      </div>
      <div class="auto-layout horizontal right w-full">
        <AppButton label="Close" @click="dialog?.close()" />
      </div>
    </div>
  </dialog>
</template>

<style lang="css" scoped>
.compare-container {
  height: 180px;
  justify-content: space-between;
  align-items: center;
  border-radius: 32px;
  border-radius: 32px;

  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: gray;
}

.similarity {
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-left: 8px;
  padding-right: 8px;
}

.compare-left-right .left,
.compare-left-right .right {
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
