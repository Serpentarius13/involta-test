<template>
  <div class="w-full flex gap-[2rem] items-center">
    <TextInput v-model="messageText" class="w-full" />

    <BaseButton @click="sendMessage"> Отправить </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/shared/ui/Button/BaseButton.vue";
import TextInput from "@/components/shared/ui/Input/TextInput.vue";
import { ref } from "vue";
import { useMessengerStore } from "../../model/useMessengerStore";

const messageText = ref<string>("");

const store = useMessengerStore();

function sendMessage() {
  if (messageText.value) {
    store.sendMessage(messageText.value);
  }
}
</script>

<style scoped lang="scss"></style>
