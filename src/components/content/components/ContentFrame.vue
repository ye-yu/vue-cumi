<script setup lang="ts">
import ContentBoard from './ContentBoard.vue';

</script>

<template>
  <div class="max-w-full-800 p-16-tablet auto-layout vertical top-center gap-32">
    <div class="auto-layout vertical top-center w-full">
      <div class="todays-challenge">Today's challege</div>
      <div class="todays-challenge-caption">Reach a 100% match</div>
    </div>
    <div class="auto-layout vertical top-left gap-4 w-full">
      <div class="how-good">How good is your color matching skill?</div>
      <div class="how-good-caption">Test your color perception! Each day, a unique color is randomly selected from the preset palettes and displayed on the right. Your objective is to replicate it precisely and reach a 100% match. Ready to play?</div>
    </div>
    <ContentBoard />
  </div>
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
