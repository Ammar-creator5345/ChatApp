import { createContext, Dispatch, SetStateAction, useContext } from "react";
import {
  messageType,
  SelectedChatTypes,
  selectedUserDataTypes,
} from "../types/chatTypes";

type ChatContextTypes = {
  selectedUserData: selectedUserDataTypes | null;
  openDetailsDrawer: boolean;
  setOpenDetailsDrawer: Dispatch<SetStateAction<boolean>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
  selectedChat: SelectedChatTypes | null;
  replyMessage: messageType | null;
  setReplyMessage: Dispatch<SetStateAction<messageType | null>>;
};

export const ChatContext = createContext<ChatContextTypes>({
  selectedUserData: null,
  openDetailsDrawer: false,
  setOpenDetailsDrawer: () => {},
  setSelectedChat: () => {},
  selectedChat: null,
  replyMessage: null,
  setReplyMessage: () => {},
});
export const useChatContext = () => useContext(ChatContext);
