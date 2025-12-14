import { Dispatch, SetStateAction, useState } from "react";
import { ChatListTypes, SelectedChatTypes } from "../../types/chatTypes";
import { useSelectedUserContext } from "../../context/selectedUserContext";
import Header from "./components/header";
import SearchUserDrawer from "./components/searchUserDrawer";
import { TimeFormatter } from "../../../../utils/timeFormatter";
import { DateFormatter } from "../../../../utils/dateFormatter";
import Skeleton from "@mui/material/Skeleton";
import SkeletonMui from "../../../../shared/components/ui/skeletion";
import ChatRowSkeleton from "./components/chatRowSkeleton";

type propsTypes = {
  chatList: ChatListTypes[];
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
  loading: boolean;
};

const ChatList = ({ chatList, setSelectedChat, loading }: propsTypes) => {
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
      <SearchUserDrawer
        open={open}
        setOpen={setOpen}
        setSelectedChat={setSelectedChat}
      />

      <Header setOpen={setOpen} />

      <div className="mt-4">
        {loading ? (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 5 }).map((value, i) => (
              <ChatRowSkeleton key={i} />
            ))}
          </div>
        ) : (
          chatList.map((value) => (
            <div
              className="border border-[#838181] mt-1 p-3 flex items-center rounded-3xl justify-between cursor-pointer hover:bg-[#e2c8c8]"
              key={value.id}
              onClick={() => handleClickChat(value)}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 flex-shrink-0  rounded-full overflow-hidden">
                  <img
                    src={userData?.photoUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 truncate">
                  <h1 className="text-lg font-semibold truncate">
                    {value.otherName}
                  </h1>
                  <span className="truncate">{value.lastMessage}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm">
                  {DateFormatter(value.lastMessageTime?.seconds)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
