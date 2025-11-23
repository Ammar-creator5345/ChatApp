import { Dispatch, SetStateAction } from "react";
import { DateFormatter } from "../../../utils/dateFormatter";
import { TimeFormatter } from "../../../utils/timeFormatter";
import {
  ChatListTypes,
  messageType,
  SelectedChatTypes,
} from "../types/chatTypes";

// type messageTypes = {
//   id: string;
//   sender: string;
//   text: string;
//   timestamp: { nanoseconds: number; seconds: number };
// };
// type ChatListTypes = {
//   id: string | number;
//   lastMessage: string;
//   lastMessageSender: string;
//   lastMessageTime: { seconds: number; nanoseconds: number };
//   otherIndex: number | string;
//   otherName: string;
//   participants: string[];
//   participantsNames: string[];
// };
// type SelectedChatTypes = {
//   id: string;
//   name: string;
//   participants: string[];
// };
type propsTypes = {
  chatList: ChatListTypes[];
  setChatList: Dispatch<SetStateAction<ChatListTypes[]>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};

const ChatList = ({ chatList, setChatList, setSelectedChat }: propsTypes) => {
  const handleClickChat = (value: any) => {
    setSelectedChat({
      id: value.id.toString(),
      name: value.otherName,
      participants: value.participants,
    });
  };
  // console.log(chatList);
  return (
    <div className="w-[450px]">
      <h1 className="text-4xl font-bold">chats</h1>
      {chatList.map((value, i) => (
        <div
          className="border mt-5 p-3 flex items-center justify-between cursor-pointer hover:bg-yellow-400"
          key={value.id}
          onClick={() => handleClickChat(value)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-200"></div>
            <div>
              <h1 className="text-lg font-semibold">{value.otherName}</h1>
              <span>{value.lastMessage}</span>
            </div>
          </div>
          <div>
            <span>{TimeFormatter(value.lastMessageTime.seconds)}</span>
            <br />
            <span>{DateFormatter(value.lastMessageTime.seconds)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
