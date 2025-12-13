import { Dispatch, SetStateAction, useState } from "react";
import { ChatListTypes, SelectedChatTypes } from "../../types/chatTypes";
import { useSelectedUserContext } from "../../context/selectedUserContext";
import Header from "./components/header";
import SearchUserDrawer from "./components/searchUserDrawer";
import { TimeFormatter } from "../../../../utils/timeFormatter";
import { DateFormatter } from "../../../../utils/dateFormatter";

type propsTypes = {
  chatList: ChatListTypes[];
  setChatList: Dispatch<SetStateAction<ChatListTypes[]>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};

const ChatList = ({ chatList, setChatList, setSelectedChat }: propsTypes) => {
  const userData = useSelectedUserContext()?.selectedUserData;
  const [open, setOpen] = useState<boolean>(false);

  const handleClickChat = (value: any) => {
    setSelectedChat({
      id: value.id.toString(),
      name: value.otherName,
      participants: value.participants,
      otherUid: value?.otherUid,
    });
  };

  return (
    <div className="relative h-screen w-[440px] p-4 overflow-x-hidden">
      <SearchUserDrawer open={open} setOpen={setOpen} setSelectedChat={setSelectedChat}/>

      <Header setOpen={setOpen} />

      <div className="mt-4">
        {chatList.map((value) => (
          <div
            className="border border-[#838181] mt-1 p-3 flex items-center rounded-3xl justify-between cursor-pointer hover:bg-[#e2c8c8]"
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
              <span>{DateFormatter(value.lastMessageTime?.seconds)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
