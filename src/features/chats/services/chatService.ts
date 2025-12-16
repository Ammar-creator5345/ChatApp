import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";
import { ChatListTypes } from "../types/chatTypes";

export const getChats = (
  userId: string,
  callBack: (chats: ChatListTypes[]) => void
) => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId),
    orderBy("lastMessageTime", "desc")
  );
  const unsub = onSnapshot(q, (snapshot: any) => {
    const chatList: ChatListTypes[] = snapshot.docs.map((doc: any) => {
      const data = doc.data() as ChatListTypes;
      const otherIndex = data?.participants?.indexOf(userId) === 0 ? 1 : 0;
      return {
        ...data,
        id: doc.id,
        otherUid: data.participants[otherIndex],
        otherName: data.participantsNames[otherIndex],
        otherIndex,
      } as ChatListTypes;
    });
    console.log("Chats for current user:", chatList);
    callBack(chatList);
  });
  return unsub;
};

export const deleteChat = async (id: string) => {
  const messagesRef = collection(db, "chats", id, "messages");
  const messageSnap = await getDocs(messagesRef);
  const deletionDocs = messageSnap?.docs?.map((doc) => {
    deleteDoc(doc?.ref);
  });
  await Promise.all(deletionDocs);
  await deleteDoc(doc(db, "chats", id));
};
