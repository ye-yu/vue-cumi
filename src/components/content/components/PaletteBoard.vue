<script setup lang="ts">
import PaletteBoardControl from './PaletteBoardControl.vue';
import PaletteBoardHeader from './PaletteBoardHeader.vue';

</script>

<template>
  <div class="container auto-layout vertical top-left">
    <PaletteBoardHeader />
    <PaletteBoardControl />
  </div>
</template>

<style lang="css" scoped>
.container {
  gap: 16px;
}
</style>
