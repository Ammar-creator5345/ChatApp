import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { messageType } from "../types/chatTypes";
import { db } from "../../../config/firebase/InitializeFireBase";
import { useAuth } from "../../auth/context/authContext";
import { uploadFile } from "../../../shared/services/cloudinary/uploadData";
import { uploadFileToSupabase } from "../../../shared/services/supabase/uploadFile";
import useActiveUser from "../../../shared/hooks/useActiveUser";
const useMessages = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<null | messageType[]>(null);
  const { user } = useAuth();
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const { activeUser } = useActiveUser("otherId");

  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unSubcribe = onSnapshot(q, (res) => {
      const chats = res.docs.map((chat) => ({
        id: chat.id,
        ...chat.data(),
      })) as messageType[];
      setMessages(chats);
      console.log(chats);
      updateDoc(doc(db, "chats", chatId), {
        [`unreadCount.${user?.uid}`]: 0,
      });
      res.docChanges().forEach((change: any) => {
        const msg = change.doc.data();
        if (
          change.type === "added" &&
          msg.senderId !== user?.uid &&
          msg.status !== "seen"
        ) {
          updateDoc(change.doc.ref, { status: "seen" });
        }
      });
    });
    return unSubcribe;
  }, [chatId]);

  const sendMessage = async (text: string, otherUid: string) => {
    try {
      if (!text.trim() || !chatId) return;

      setMessagesLoading(true);
      const sendingText = text;
      const id = chatId;
      const collectionData = collection(db, "chats", id, "messages");
      const senderBlockedReceiver =
        activeUser?.blockedUsers?.includes(otherUid);
      const receiverSnap = await getDoc(doc(db, "users", otherUid));
      if (!receiverSnap.exists()) return;
      const receiverBlockedSender = receiverSnap
        .data()
        .blockedUsers?.includes(user?.uid);
      if (senderBlockedReceiver || receiverBlockedSender) {
        console.log("You are blocked");
        return { success: false };
      }
      const res = await addDoc(collectionData, {
        senderId: user?.uid,
        text: sendingText,
        timestamp: new Date(),
        type: "text",
        status: "sent",
      });
      const reference = await doc(db, "chats", id);
      await updateDoc(reference, {
        lastMessage: text,
        lastMessageSender: user?.uid,
        lastMessageTime: new Date(),
        [`unreadCount.${otherUid}`]: increment(1),
      });
      console.log("added Message", res);
    } catch (err) {
      console.log(err);
    } finally {
      setMessagesLoading(false);
    }
  };
  const sendFile = async (fileType: string, file: any) => {
    try {
      if (!file) return;
      let fileUrl;
      if (fileType === "application/pdf") {
        const res = await uploadFileToSupabase(file);
        fileUrl = res?.publicUrl;
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "chat_app");
        const res = await uploadFile(formData, fileType);
        fileUrl = res?.data?.secure_url || res?.data?.url;
      }
      const collectionData = collection(
        db,
        "chats",
        chatId as string,
        "messages"
      );
      await addDoc(collectionData, {
        senderId: user?.uid,
        timestamp: new Date(),
        fileUrl: fileUrl,
        type: fileType,
        status: "sent",
        fileName: file.name,
      });
      console.log("added Message");
    } catch (err) {
      console.log(err);
    }
  };

  return { messages, sendMessage, sendFile, messagesLoading };
};

export default useMessages;
