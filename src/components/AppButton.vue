<script setup lang="ts">

defineProps<{
  icon?: string
  label: string
}>()

defineEmits<{
  (event: "click"): void
}>()
</script>

<template>
  <button @click="$emit('click')" type="button" class="auto-layout horizontal left gap-8">
    <span v-if="icon" class="material-symbols-outlined">
      {{ icon }}
    </span>
    <span class="button-label">
      {{ label }}
    </span>
  </button>
</template>

<style lang="css" scoped>
.button-label {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: #000;
}

button {
  border: 0;
  border-radius: 16px;
  padding: 4px 16px;
  background: #e8e8e8;
  cursor: pointer;
  height: 32px;
}

button:hover {
  background: #e0e0e0;
}

button:active {
  background: #d8d8d8;
}
</style>
