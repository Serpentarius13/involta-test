<template>
  <ul
    :id="LIST_ID"
    class="w-full flex flex-col gap-[1rem] max-h-full overflow-y-auto p-[1rem]"
  >
    <MessagesLoader />
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
</template>

<script setup lang="ts">
import { useMessengerStore } from "../../model/useMessengerStore";

import { LIST_ID } from "../../model/useMessengerStore";

import { TMessage } from "@/shared/types/message.types";
import MessagesLoader from "./MessagesLoader.vue";

const store = useMessengerStore();

const getMessage = (msg: TMessage): string =>
  typeof msg === "string" ? msg : msg.message;
</script>

<style scoped lang="scss"></style>
