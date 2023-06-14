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
import { onMounted } from "vue";
import { useMessengerStore } from "./model/useMessengerStore";
import TheMessages from "./ui/Messages/TheMessages.vue";
import SendMessage from "./ui/SendMessage/SendMessage.vue";
import MessagesError from "./ui/Messages/MessagesError.vue";

const store = useMessengerStore();

onMounted(() => {
  store.loadMessages().then(() => store.scrollToBottom());
});
</script>

<style scoped lang="scss"></style>
