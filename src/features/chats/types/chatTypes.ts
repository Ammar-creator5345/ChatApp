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
