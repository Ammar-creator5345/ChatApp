import { useState } from "react";
import ChatList from "../features/chats/sections/chatList/chatList";
import ChatSection from "../features/chats/sections/chatSection/chatSection";
import { useAuth } from "../features/auth/context/authContext";
import { messageType, SelectedChatTypes } from "../features/chats/types/chatTypes";
import { ChatContext } from "../features/chats/context/chatContext";
import DetailsDrawer, {
  drawerWidth,
} from "../features/chats/sections/chatDrawer/detailsDrawer";
import useChats from "../features/chats/hooks/useChats";
import useSelectedUser from "../features/chats/hooks/useSelectedUser";



const Chats = () => {
  const { user } = useAuth();
  const { chatList, loading } = useChats(user?.uid!);
  const [selectedChat, setSelectedChat] = useState<SelectedChatTypes | null>(
    null
  );
  const { selectedUserData } = useSelectedUser(selectedChat?.otherUid!);
  const [openDetailsDrawer, setOpenDetailsDrawer] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<messageType | null>(null)

  return (
    <>
      <ChatContext.Provider
        value={{
          selectedUserData,
          openDetailsDrawer,
          setOpenDetailsDrawer,
          setSelectedChat,
          selectedChat,
          replyMessage,
          setReplyMessage
        }}
      >
        <DetailsDrawer
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          selectedUserData={selectedUserData}
          chatList={chatList}
        />
        <div
          style={{
            marginRight: openDetailsDrawer ? drawerWidth : "",
          }}
        >
          <div>
            <div className="bg-red-100 flex">
              <div className="">
                <ChatList
                  chatList={chatList}
                  setSelectedChat={setSelectedChat}
                  loading={loading}
                />
              </div>
              <div className="border-l border-l-black flex-1">
                {selectedChat ? (
                  <ChatSection selectedChat={selectedChat} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    Select a chat to start messaging
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ChatContext.Provider>
    </>
  );
};

export default Chats;
