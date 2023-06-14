<template>
  <div
    class="w-full h-full flex flex-col gap-[2rem] shadow-xl shadow-black border-[1px] border-black p-[1rem]"
  >
    <MessagesError :error="store.error" />
    <TheMessages class="flex-1" />
    <SendMessage />
  </div>
</template>

<script setup lang="ts">
import { useMessengerStore } from "./model/useMessengerStore";
import TheMessages from "./ui/Messages/TheMessages.vue";
import SendMessage from "./ui/SendMessage/SendMessage.vue";
import MessagesError from "./ui/Messages/MessagesError.vue";
import { onMounted } from "vue";

const store = useMessengerStore();

onMounted(() => {
  store.loadMessages();
});
</script>

<style scoped lang="scss"></style>
