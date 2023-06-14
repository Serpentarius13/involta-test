<template>
  <strong
    class="border-2 border-red-500 text-red-500 font-bold text-2xl px-[1.5rem] py-[1rem] bg-white"
    v-if="error"
  >
    {{ error }}
  </strong>
</template>

<script setup lang="ts">
defineProps<{ error: string | null }>();
</script>

<style scoped lang="scss"></style>
