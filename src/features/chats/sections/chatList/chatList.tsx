import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ChatListTypes, SelectedChatTypes } from "../../types/chatTypes";
import { useSelectedUserContext } from "../../context/selectedUserContext";
import Header from "./components/layout/header";
import SearchUserDrawer from "./components/layout/searchUserDrawer";
import { DateFormatter } from "../../../../utils/dateFormatter";
import ChatRowSkeleton from "./components/layout/chatRowSkeleton";
import { useAuth } from "../../../auth/context/authContext";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/dropdown.svg";
import PopOver from "./components/ui/popover";
import ConfirmationModal from "../../components/layout/confirmationModal";
import useActiveUser from "../../../../shared/hooks/useActiveUser";
import AllChats from "./components/layout/allChats";

type propsTypes = {
  chatList: ChatListTypes[];
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
  loading: boolean;
};

const ChatList = ({ chatList, setSelectedChat, loading }: propsTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
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

  const favouriteChats = useMemo(() => {
    if (!user) return [];
    return chatList.filter((chat) => chat.favourites?.[user.uid]);
  }, [chatList, user?.uid]);

  const unreadChats = useMemo(() => {
    if (!user) return [];
    return chatList.filter((chat) => chat.unreadCount?.[user.uid]);
  }, [chatList, user?.uid]);

  const filteredChats = useMemo(() => {
    let renderChats: ChatListTypes[] = [];
    switch (chatsType) {
      case "all":
        renderChats = chatList;
        break;
      case "favourites":
        renderChats = favouriteChats;
        break;
      case "unread":
        renderChats = unreadChats;
        break;
    }
    if (search.trim() === "") return renderChats;
    return renderChats.filter((chat) =>
      chat.otherName.toLowerCase().includes(search.toLowerCase())
    );
  }, [chatList, favouriteChats, chatsType, search]);

  useEffect(() => {
    console.log(chatsType);
  }, [chatsType]);
  const handleClickChat = (value: ChatListTypes) => {
    setSelectedChat({
      id: value.id.toString(),
      name: value.otherName,
      participants: value.participants,
      otherUid: value?.otherUid,
      favourites: value?.favourites,
    });
  };
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

        <Header
          search={search}
          setSearch={setSearch}
          setOpen={setOpen}
          setChatsType={setChatsType}
        />
        <AllChats
          search={search}
          loading={loading}
          filteredChats={filteredChats}
          handleClick={handleClick}
          handleClickChat={handleClickChat}
          setSelected_chat={setSelected_chat}
        />
      </div>
    </>
  );
};

export default ChatList;
