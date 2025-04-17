<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import PaletteBoardControl from './PaletteBoardControl.vue';
import PaletteBoardHeader from './PaletteBoardHeader.vue';
import { useActivePalette } from '@/composables/use-active-palette';

const activePalette = useActivePalette()

</script>

<template>
  <div class="container auto-layout vertical top-left">
    <PaletteBoardHeader />
    <PaletteBoardControl />
    <AppButton label="Reset" @click="activePalette.resetMix()" />
  </div>
</template>

<style lang="css" scoped>
.container {
  gap: 16px;
}
</style>
