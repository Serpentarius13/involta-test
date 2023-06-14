<template>
  <ul
    class="flex flex-col gap-[1rem] w-full max-h-full overflow-y-auto"
    id="messagesList"
  >
    <li
      v-for="message in store.messages"
      :key="getMessage(message)"
      :class="[
        typeof message !== 'string' && message.mine ? 'self-end' : '',
        'p-[1rem] rounded-xl bg-white border-[1px] border-black max-w-[50%] break-words',
      ]"
    >
      {{ getMessage(message) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { TMessage } from "@/components/shared/types/message.types";
import { useMessengerStore } from "../../model/useMessengerStore";

const store = useMessengerStore();

const getMessage = (message: TMessage) =>
  typeof message === "string" ? message : message.message;
</script>

<style scoped lang="scss"></style>
