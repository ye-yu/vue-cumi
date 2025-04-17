<script setup lang="ts">
import ContentFrame from './components/ContentFrame.vue';
import PaletteFrame from './components/PaletteFrame.vue';

</script>

<template>
  <div class="auto-layout vertical center container" style="padding-bottom: 80px;">
    <ContentFrame />
    <PaletteFrame />
  </div>
</template>


<style lang="css" scoped>
.container {
  width: 100%;
  gap: 64px;
}
</style>
