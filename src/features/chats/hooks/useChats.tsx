import { useEffect, useState } from "react";
import { getChats } from "../services/chatService";
import { ChatListTypes } from "../types/chatTypes";

const useChats = (userId: string) => {
  const [chatList, setChatList] = useState<ChatListTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!userId) return;
    const unSub = getChats(userId, (chats) => {
      setChatList(chats);
      setLoading(false);
    });
    return () => unSub();
  }, [userId]);
  return { chatList, setChatList, loading };
};

export default useChats;
