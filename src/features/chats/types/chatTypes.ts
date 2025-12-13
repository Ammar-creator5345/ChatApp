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
};

export type ChatListTypes = {
  id: string | number;
  lastMessage: string;
  lastMessageSender: string;
  lastMessageTime: { seconds: number; nanoseconds: number };
  otherIndex: number | string;
  otherName: string;
  participants: string[];
  participantsNames: string[];
};
export type SelectedChatTypes = {
  id: string;
  name: string;
  participants: string[];
  otherUid?: string;
};

export type selectedUserDataTypes = {
  displayName: string;
  email: string;
  isOnline: boolean;
  photoUrl: string;
  uid: string;
  about: string;
  phoneNumber: string;
};

export type DetailsDrawerTypes = {
  selectedUserData: selectedUserDataTypes | null;
};

export type SearchUserDrawerTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};
export type HeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type UserTypes = selectedUserDataTypes;
