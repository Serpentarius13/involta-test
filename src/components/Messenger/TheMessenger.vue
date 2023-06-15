<template>
  <div
    class="w-full h-full flex flex-col gap-[2rem] shadow-xl shadow-black border-[1px] border-black p-[1rem]"
  >
    <MessagesError :error="store.error" />
    <ul
      class="w-full flex flex-col gap-[1rem] max-h-full overflow-y-auto p-[1rem] flex-1"
      ref="listRef"
    >
      <MessagesLoader v-if="store.hasInitiallyLoaded" />
      <li
        v-for="message in store.messages"
        :key="getMessage(message)"
        :class="[
          typeof message !== 'string' && message.mine ? 'self-end' : '',
          'p-[1rem] rounded-xl bg-white border-[1px] border-black max-w-[50%] break-words ',
        ]"
      >
        {{ getMessage(message) }}
      </li>
    </ul>
    <SendMessage :handleScroll="scrollBottom" />
  </div>
</template>

<script setup lang="ts">
import { useMessengerStore } from "./model/useMessengerStore";

import SendMessage from "./ui/SendMessage/SendMessage.vue";
import MessagesError from "./ui/Messages/MessagesError.vue";
import { TMessage } from "@/shared/types/message.types";
import MessagesLoader from "./ui/Messages/MessagesLoader.vue";
import { onMounted, ref } from "vue";
import { scrollToBottom } from "@/shared/lib/utils/scrollToBottom";

const store = useMessengerStore();

const listRef = ref<HTMLElement | null>();

function scrollBottom() {
  if (!listRef.value) return;

  scrollToBottom(listRef.value);
}

onMounted(() => {
  store.loadMessages().then(scrollBottom);
});

const getMessage = (msg: TMessage): string =>
  typeof msg === "string" ? msg : msg.message;
</script>

<style scoped lang="scss"></style>
