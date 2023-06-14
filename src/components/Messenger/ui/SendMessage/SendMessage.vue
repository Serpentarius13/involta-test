<template>
  <div class="w-full flex gap-[2rem] items-center">
    <TextInput v-model="messageText" class="w-full" />

    <LoadingButton :isLoading="store.isLoading" @click="sendMessage">
      <span> Отправить </span>
    </LoadingButton>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/shared/ui/Input/TextInput.vue";
import { ref } from "vue";
import { useMessengerStore } from "../../model/useMessengerStore";

import LoadingButton from "@/shared/ui/Button/LoadingButton.vue";
import { useToast } from "vue-toastification";

const messageText = ref<string>("");

const store = useMessengerStore();

const toast = useToast();

function sendMessage() {
  if (messageText.value) {
    store.sendMessage(messageText.value);
    messageText.value = "";
  } else {
    toast.warning("Введите сообщение");
  }
}
</script>

<style scoped lang="scss"></style>
