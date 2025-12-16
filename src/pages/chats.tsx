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
  onSnapshot,
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
import UseChats from "../features/chats/hooks/useChats";
import useChats from "../features/chats/hooks/useChats";

const Chats = () => {
  const { user } = useAuth();
  // const [loading, setLoading] = useState(false);
  const { chatList, setChatList, loading } = useChats(user?.uid!);
  const [selectedChat, setSelectedChat] = useState<SelectedChatTypes | null>(
    null
  );
  const [selectedUserData, setSelectedUserData] =
    useState<selectedUserDataTypes | null>(null);
  const [openDetailsDrawer, setOpenDetailsDrawer] = useState<boolean>(false);
  const navigate = useNavigate();
  // const handleSignOut = () => {
  //   updateDoc(doc(db, "users", user?.uid as string), { isOnline: false });
  //   setLoading(true);
  //   signOut(auth)
  //     .then(() => {
  //       console.log("log out successfull");
  //       navigate("/login");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

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
        <DetailsDrawer
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          selectedUserData={selectedUserData}
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
      </SelectedUserContext.Provider>
    </>
  );
};

export default Chats;
