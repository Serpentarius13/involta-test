import { baseURL } from "@/components/shared/api/baseURL";
import { TMessage } from "@/components/shared/types/message.types";

export const getMessages = async (offset: number) => {
  let path = `${baseURL}/getMessages`;

  path += offset > 0 ? `?offset=${offset}` : "";

  const response = await fetch(path, { method: "GET" }).catch(() => {
    throw new Error("Ошибка получения сообщений");
  });

  const textData = await response.text();

  try {
    const data = JSON.parse(textData);

    return data.result as TMessage[];
  } catch (error) {
    throw new Error(textData);
  }
};
