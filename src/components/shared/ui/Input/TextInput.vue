<template>
  <input
    v-model="model"
    class="outline-none border-[1px] border-black p-[1rem] rounded-sm"
  />
</template>

<script setup lang="ts">
const model = defineModel();
</script>

<style scoped lang="scss"></style>
