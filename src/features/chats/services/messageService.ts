import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";

export const deleteForMe = async (
  chatId: string,
  messageId: string,
  userId: string
) => {
  if (!chatId || !messageId || !userId) return;
  const docRef = doc(db, "chats", chatId, "messages", messageId);
  await updateDoc(docRef, {
    deletedForMe: arrayUnion(userId),
  });
};

export const deleteForAll = async (
  chatId: string,
  messageId: string,
  userId: string
) => {
  if (!chatId || !messageId || !userId) return;
  const docRef = doc(db, "chats", chatId, "messages", messageId);
  await updateDoc(docRef, {
    text: "",
    fileUrl: "",
    deletedForAll: true,
  });
};
