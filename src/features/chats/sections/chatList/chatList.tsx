import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ChatListTypes, SelectedChatTypes } from "../../types/chatTypes";
import { useSelectedUserContext } from "../../context/selectedUserContext";
import Header from "./components/header";
import SearchUserDrawer from "./components/searchUserDrawer";
import { DateFormatter } from "../../../../utils/dateFormatter";
import ChatRowSkeleton from "./components/chatRowSkeleton";
import { useAuth } from "../../../auth/context/authContext";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/dropdown.svg";
import PopOver from "./components/popover";
import ConfirmationModal from "../../components/layout/confirmationModal";
import useActiveUser from "../../../../shared/hooks/useActiveUser";

type propsTypes = {
  chatList: ChatListTypes[];
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
  loading: boolean;
};

const ChatList = ({ chatList, setSelectedChat, loading }: propsTypes) => {
  const userData = useSelectedUserContext()?.selectedUserData;
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const [chatsType, setChatsType] = useState<"all" | "unread" | "favourites">(
    "all"
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [selected_chat, setSelected_chat] = useState<ChatListTypes | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const allChats = chatList;
  const favouriteChats = useMemo(() => {
    if (!user) return;
    return chatList.filter((chat) => chat.favourites?.[user.uid]);
  }, [chatList, user?.uid]);

  const filteredChats = {
    all: allChats,
    favourites: favouriteChats,
    unread: [],
  };
  useEffect(() => {
    console.log(chatsType);
  }, [chatsType]);
  const handleClickChat = (value: any) => {
    setSelectedChat({
      id: value.id.toString(),
      name: value.otherName,
      participants: value.participants,
      otherUid: value?.otherUid,
    });
  };
  useActiveUser();
  return (
    <>
      <PopOver
        openPopover={openPopover}
        handleClose={handleClose}
        anchorEl={anchorEl}
        id={id}
        chat={selected_chat}
      />

      <div className="relative h-screen w-[440px] p-4 overflow-x-hidden">
        <SearchUserDrawer
          open={open}
          setOpen={setOpen}
          setSelectedChat={setSelectedChat}
        />

        <Header setOpen={setOpen} setChatsType={setChatsType} />

        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col gap-1">
              {Array.from({ length: 5 }).map((value, i) => (
                <ChatRowSkeleton key={i} />
              ))}
            </div>
          ) : (
            filteredChats[chatsType]?.map((value: ChatListTypes) => (
              <div
                className="border border-[#838181] mt-1 p-3 flex items-center rounded-3xl justify-between cursor-pointer hover:bg-[#e2c8c8] group"
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
                <div className="flex-shrink-0 flex flex-col justify-center transition-all items-end gap-1">
                  <span className="text-sm">
                    {DateFormatter(value.lastMessageTime?.seconds)}
                  </span>
                  <button
                    onClick={(e) => {
                      setSelected_chat(value);
                      handleClick(e);
                    }}
                    className="mx-1 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                  >
                    <DropdownIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
