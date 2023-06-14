export interface IMyMessage {
  message: string;
  mine: boolean;
}


export type TMessage = string | IMyMessage;