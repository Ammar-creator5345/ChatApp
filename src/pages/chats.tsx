import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase/InitializeFireBase";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ChatList from "../features/chats/sections/chatList/chatList";
import ChatSection from "../features/chats/sections/chatSection/chatSection";
import { useAuth } from "../features/auth/context/authContext";
import {
  ChatListTypes,
  SelectedChatTypes,
  selectedUserDataTypes,
} from "../features/chats/types/chatTypes";
import { SelectedUserContext } from "../features/chats/context/selectedUserContext";
import DetailsDrawer, {
  drawerWidth,
} from "../features/chats/sections/chatDrawer/detailsDrawer";

const Chats = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<ChatListTypes[]>([]);
  const [selectedChat, setSelectedChat] = useState<SelectedChatTypes | null>(
    null
  );
  const [selectedUserData, setSelectedUserData] =
    useState<selectedUserDataTypes | null>(null);
  const [openDetailsDrawer, setOpenDetailsDrawer] = useState<boolean>(false);
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
        const otherIndex = data?.participants?.indexOf(user.uid) === 0 ? 1 : 0;
        return {
          ...data,
          id: doc.id,
          otherUid: data.participants[otherIndex],
          otherName: data.participantsNames[otherIndex],
          otherIndex,
        };
      });

      console.log("Chats for current user:", chatList);
      setChatList(chatList);
    };

    getChats();
  }, [user]);
  useEffect(() => {
    const getOtherUserDetails = async () => {
      if (!selectedChat?.otherUid) return;
      console.log("selected chat: ", selectedChat);
      const docRef = doc(db, "users", selectedChat?.otherUid as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setSelectedUserData({
          displayName: data?.displayName,
          email: data?.email,
          isOnline: data?.isOnline,
          photoUrl: data?.photoUrl,
          uid: data?.uid,
          about: data?.about,
          phoneNumber: data?.phoneNumber,
        });
      } else {
        console.log("No such document!");
      }
    };
    getOtherUserDetails();
  }, [selectedChat]);

  return (
    <>
      <SelectedUserContext.Provider
        value={{ selectedUserData, openDetailsDrawer, setOpenDetailsDrawer }}
      >
        <DetailsDrawer selectedUserData={selectedUserData} />
        <div
          style={{
            marginRight: openDetailsDrawer ? drawerWidth : "",
          }}
        >
          {loading && (
            <div className="bg-white/10 z-[200] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <CircularProgress color="inherit" />
            </div>
          )}
          <div>
            <div className="bg-red-100 flex">
              <div className="">
                <ChatList
                  chatList={chatList}
                  setChatList={setChatList}
                  setSelectedChat={setSelectedChat}
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
      </SelectedUserContext.Provider>
    </>
  );
};

export default Chats;
