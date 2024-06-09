import { MessageResponseProps } from "./customTypes";

export const isSameSender = (messages: MessageResponseProps[], currentMessage: MessageResponseProps, index: number) => {
  return index < messages.length - 1 && messages[index + 1].senderId !== currentMessage.senderId;
};

export const isLastMessage = (messages: MessageResponseProps[], index: number) => index === messages.length - 1;
