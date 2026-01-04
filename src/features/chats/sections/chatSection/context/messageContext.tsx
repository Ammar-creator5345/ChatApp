import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from "react";

type MessageContextTypes = {
  scrollToMessage: (messageId: string) => void;
  messageRef: RefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  highlightedMessageId: string | null;
};

export const MessageContext = createContext<MessageContextTypes>({
  scrollToMessage: () => {},
  messageRef: { current: {} },
  highlightedMessageId: null,
});
export const useMessageContext = () => useContext(MessageContext);
