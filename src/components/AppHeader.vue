<script setup lang="ts">
</script>

<template>
  <div class="header auto-layout vertical center">
    <div class="cumi">
      CUMI
    </div>
    <div class="caption">
      can you mix it?
    </div>
  </div>
</template>

<style scoped lang="css">
.header {
  height: 80px;
}

.cumi {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 32px;
  background: linear-gradient(90deg, #cc3266 12.02%, #cc8455 24.04%, #9ccc6b 70.19%, #187a7a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.caption {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #a8a8a8;
}
</style>
