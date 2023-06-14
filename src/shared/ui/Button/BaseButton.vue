<template>
  <button
    class="px-[2rem] py-[1rem] rounded-sm bg-blue-600 text-white hover:bg-white border-2
     border-blue-600 hover:text-black transition-all
     flex items-center justify-center gap-[1rem] disabled:bg-gray-500 disabled:cursor-default"
  >
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
