import { signOut } from "firebase/auth";
import { auth, db } from "../auth/InitializeFireBase";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ChatList from "../features/chats/components/chatList";
import ChatSection from "../features/chats/components/chatSection";
import { useAuth } from "../auth/authContext";
import {
  ChatListTypes,
  SelectedChatTypes,
} from "../features/chats/types/chatTypes";

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
const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<ChatListTypes[]>([]);
  const [selectedChat, setSelectedChat] = useState<SelectedChatTypes | null>(
    null
  );
  const navigate = useNavigate();
  const handleSignOut = () => {
    updateDoc(doc(db, "users", user?.uid as string), { isOnline: false });
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("log out successfull");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const getChats = async () => {
      if (!user?.uid) return;

      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
      );

      const snapshot = await getDocs(q);

      const chatList: ChatListTypes[] = snapshot.docs.map((doc) => {
        const data = doc.data() as ChatListTypes;
        const otherIndex = data.participants.indexOf(user.uid) === 0 ? 1 : 0;
        return {
          ...data,
          id: doc.id,
          otherUid: data.participants[otherIndex],
          otherName: data.participantsNames[otherIndex],
          otherIndex,
        };
      });

      // console.log("✅ Chats for current user:", chatList);
      setChatList(chatList);
    };

    getChats();
  }, [user]);
  useEffect(() => {
    // console.log("selected chat: ", selectedChat);
  }, [selectedChat]);

  return (
    <div>
      {loading && (
        <div className="bg-white/10 z-[200] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div>
        <h1>this is profile page</h1>
        <button
          onClick={handleSignOut}
          className="border mt-3 mx-4 border-black p-2 rounded-md transition-all hover:bg-black hover:text-white"
        >
          log out
        </button>
        <div className="bg-red-100 flex items-center">
          <div className="bg-yellow-300">
            <ChatList
              chatList={chatList}
              setChatList={setChatList}
              setSelectedChat={setSelectedChat}
            />
          </div>
          <div className="bg-blue-700 flex-1">
            {selectedChat ? (
              <ChatSection selectedChat={selectedChat} />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
