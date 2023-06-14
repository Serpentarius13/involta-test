import { TMessage } from "@/shared/types/message.types";
import { defineStore } from "pinia";
import { getMessages } from "../api/getMessages";
import { useToast } from "vue-toastification";

export const PAGE_LIMIT = 20;

export const LIST_ID = "messagesList";

interface IStore {
  messages: TMessage[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  noMessagesLeft: boolean;
  hasInitiallyLoaded: boolean;
}

export const useMessengerStore = defineStore("messenger-store", {
  state: (): IStore => ({
    messages: [],
    loading: false,
    error: null,
    currentPage: 0,
    noMessagesLeft: false,
    hasInitiallyLoaded: false,
  }),
  actions: {
    async loadMessages() {
      if (this.noMessagesLeft || this.loading) return;

      // выставляем isLoading
      this.load();

      // очищаем ошибки
      this.clearError();

      // увеличиваем текущую страницу
      this.increasePage();

      // высчитываем оффсет
      const page = this.currentPage - 1;

      const offset = page * PAGE_LIMIT;

      try {
        // гетаем сообщения с оффсетом
        const messages = await getMessages(offset);

        // если их нет, сообщения кончились
        if (messages.length === 0) {
          return (this.noMessagesLeft = true);
        }

        // Переворачиваем массив с данными чтобы показывать их сверху вниз
        //? Принял такое решение потому что в ином случае мне пришлось бы использовать unshift на массив, что стоит O(n) операций
        //? Показалось что лучше сделать именно так, но могу ошибаться
        messages.reverse();

        // Высчитываем, изначальная ли это подгрузка
        const isInitial = this.messages.length === 0;

        this.messages = [...messages, ...this.messages];

        if (isInitial) {
          this.hasInitiallyLoaded = true;

          this.scrollToBottom();
        }
      } catch (error: any) {
        // Если не удалось загрузить сообщения, понижаем страницу
        this.decreasePage();

        console.log("error");

        // Если ничего не было подгружено, пробуем еще раз
        if (!this.hasInitiallyLoaded) {
          this.unload();
          this.loadMessages();
        } else {
          // Иначе выдаем ошибку и выставляем ее в стейт
          const toast = useToast();
          toast.error(error?.message);
          this.setError(error?.message);
        }
      } finally {
        // Выключаем загрузку
        this.unload();
      }
    },

    sendMessage(text: string) {
      const message: TMessage = { mine: true, message: text };

      this.messages.push(message);

      this.scrollToBottom();
    },

    scrollToBottom() {
      const list = document.getElementById(LIST_ID);

      console.log(list);
      if (!list) return;

      setTimeout(() => {
        list.scrollTop = list.scrollHeight;
      }, 10);
    },

    increasePage() {
      this.currentPage++;
    },

    decreasePage() {
      if (this.currentPage > 0) this.currentPage--;
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
