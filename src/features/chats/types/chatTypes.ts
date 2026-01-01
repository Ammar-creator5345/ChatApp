import { Dispatch, SetStateAction } from "react";

export type messageType = {
  id: string;
  senderId: string;
  text: string;
  type: string;
  status: string;
  fileUrl: string;
  timestamp: { seconds: number; nanoseconds: number };
  fileName: string;
  deletedForMe?: string[];
  deletedForAll?: true;
  replyTo: {
    messageId: string;
    text: string | null;
    senderId: string;
    type: string;
    file: string | null;
  };
};

export type ChatListTypes = {
  id: string;
  lastMessage: string;
  lastMessageSender: string;
  lastMessageTime: { seconds: number; nanoseconds: number };
  otherIndex: number | string;
  otherName: string;
  otherUid: string;
  participants: string[];
  participantsNames: string[];
  favourites: Record<string, boolean>;
  unreadCount: Record<string, number>;
};
export type SelectedChatTypes = {
  id: string;
  name: string;
  participants: string[];
  otherUid?: string;
  favourites?: Record<string, boolean>;
};

export type selectedUserDataTypes = {
  displayName: string;
  email: string;
  isOnline: boolean;
  photoUrl: string;
  uid: string;
  about: string;
  phoneNumber: string;
  blockedUsers?: string[];
  lastOnline: { seconds: number; nanoseconds: number };
};

export type DetailsDrawerTypes = {
  selectedUserData: selectedUserDataTypes | null;
  selectedChat: SelectedChatTypes | null;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
  chatList: ChatListTypes[];
};

export type SearchUserDrawerTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};
export type HeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setChatsType: Dispatch<SetStateAction<"all" | "unread" | "favourites">>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export type UserTypes = selectedUserDataTypes;
