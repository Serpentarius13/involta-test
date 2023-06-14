import { TMessage } from "@/components/shared/types/message.types";
import { defineStore } from "pinia";
import { getMessages } from "../api/getMessages";
import { useToast } from "vue-toastification";

export const PAGE_LIMIT = 20;

interface IStore {
  messages: TMessage[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

export const useMessengerStore = defineStore("messenger-store", {
  state: (): IStore => ({
    messages: [],
    loading: false,
    error: null,
    currentPage: 1,
  }),
  actions: {
    async loadMessages() {
      const page = this.currentPage - 1;

      const offset = page * PAGE_LIMIT;

      try {
        const messages = await getMessages(offset);

        console.log(messages);

        messages.reverse();

        this.messages = [...messages, ...this.messages];
      } catch (error: any) {
        const toast = useToast();
        toast.error(error?.message);
        this.error = error;
      }
    },

    sendMessage(text: string) {
      const message: TMessage = { mine: true, message: text };

      this.messages.push(message);

      this.scrollToBottom();
    },

    scrollToBottom() {
      const list = document.getElementById("messagesList");

      console.log(list);
      if (!list) return;

      setTimeout(() => {
        list.scrollTop = list.scrollHeight;
      }, 10);
    },

    load() {
      this.loading = true;
    },
    unload() {
      this.loading = false;
    },
    setError(error: string) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    },
  },
  getters: {
    hasError(state) {
      return !!state.error;
    },
    isLoading(state) {
      return state.loading;
    },
  },
});
