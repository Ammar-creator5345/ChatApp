import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../config/firebase/InitializeFireBase";
import { selectedUserDataTypes, UserTypes } from "../../../types/chatTypes";
import { Dispatch, SetStateAction } from "react";

export const getOrCreateChat = async (
  currentUser: any,
  otherUser: UserTypes
) => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", currentUser?.uid)
  );
  const snapshot = await getDocs(q);
  const existingChat = snapshot.docs.map((doc: any) => ({
    id: doc?.id,
    ...doc.data(),
  }));
  const chatExists = existingChat.find((chat) => {
    return chat?.participants.includes(otherUser?.uid);
  });
  if (chatExists) {
    console.log("exists");
    return {
      id: chatExists?.id,
      name: otherUser?.displayName,
      participants: [currentUser?.uid as string, otherUser?.uid],
      otherUid: otherUser?.uid,
    };
  } else {
    console.log("doesn't exist");
    const newChat = await addDoc(collection(db, "chats"), {
      lastMessage: "",
      lastMessageSender: "",
      lastMessageTime: new Date(),
      participants: [currentUser?.uid as string, otherUser?.uid],
      participantsNames: [currentUser?.displayName, otherUser.displayName],
    });
    return {
      id: newChat?.id,
      name: otherUser.displayName,
      participants: [currentUser?.uid, otherUser?.uid],
      otherUid: otherUser?.uid,
    };
  }
};
