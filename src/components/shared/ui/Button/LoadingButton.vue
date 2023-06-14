<template>
  <BaseButton :disabled="isLoading">
    <BaseLoader v-show="isLoading" color="#fff" size="12" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import BaseLoader from "../Loading/BaseLoader.vue";

defineProps<{ isLoading: boolean }>();
</script>

<style scoped lang="scss"></style>
