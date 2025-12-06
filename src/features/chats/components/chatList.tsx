import { Dispatch, SetStateAction } from "react";
import { DateFormatter } from "../../../utils/dateFormatter";
import { TimeFormatter } from "../../../utils/timeFormatter";
import {
  ChatListTypes,
  messageType,
  SelectedChatTypes,
} from "../types/chatTypes";
import { useSelectedUserContext } from "../context/selectedUserContext";

type propsTypes = {
  chatList: ChatListTypes[];
  setChatList: Dispatch<SetStateAction<ChatListTypes[]>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};

const ChatList = ({ chatList, setChatList, setSelectedChat }: propsTypes) => {
  const userData = useSelectedUserContext()?.selectedUserData;
  const handleClickChat = (value: any) => {
    setSelectedChat({
      id: value.id.toString(),
      name: value.otherName,
      participants: value.participants,
      otherUid: value?.otherUid,
    });
  };
  return (
    <div className="w-[450px]">
      <h1 className="text-4xl font-bold">chats</h1>
      {chatList.map((value, i) => (
        <div
          className="border-y mt-5 p-3 flex items-center justify-between cursor-pointer border-y-black hover:bg-yellow-400"
          key={value.id}
          onClick={() => handleClickChat(value)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={userData?.photoUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
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
