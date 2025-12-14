import {
  addDoc,
  collection,
  doc,
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
const useMessages = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<null | messageType[]>(null);
  const { user } = useAuth();

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

  const sendMessage = async (text: string) => {
    try {
      if (!text.trim() || !chatId) return;
      const sendingText = text;
      const id = chatId;
      const collectionData = collection(db, "chats", id, "messages");
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
      });
      console.log("added Message", res);
    } catch (err) {
      console.log(err);
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

  return { messages, sendMessage, sendFile };
};

export default useMessages;
