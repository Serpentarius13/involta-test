<template>
  <div ref="messageLoader" v-if="!store.noMessagesLeft" />

  <span v-else class="w-full text-center"> Больше нет сообщений </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useMessengerStore } from "../../model/useMessengerStore";
import { useIntersectionObserver } from "@/components/shared/lib/hooks/useIntersectionObserver";

const messageLoader = ref<HTMLElement | null>();

const store = useMessengerStore();
useIntersectionObserver(messageLoader, store.loadMessages);
</script>

<style scoped lang="scss"></style>
