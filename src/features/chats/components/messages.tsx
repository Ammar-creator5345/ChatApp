import { DateHeaderFormatter } from "../utils/DateHeaderFormatter";
import { messageType } from "../types/chatTypes";
import { useAuth } from "../../../auth/authContext";
import { useMemo, useState } from "react";
import AudioMessage from "./audioMessage";
import PdfMessage from "./pdfMessage";
import VideoMessage from "./videoMessage";
import ImageMessage from "./imageMessage";
import TextMessage from "./textMessage";
import { useSelectedUserContext } from "../context/selectedUserContext";

type PropsTypes = {
  messages: null | messageType[];
};

const Messages = ({ messages }: PropsTypes) => {
  const { user } = useAuth();
  const userData = useSelectedUserContext()?.selectedUserData;
  const groupedMessages = useMemo(() => {
    const groups: Record<string, messageType[]> = {};
    messages?.forEach((message) => {
      const dateKey = new Date(message.timestamp.seconds * 1000).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
    });
    return groups;
  }, [messages]);

  return (
    <div>
      {Object.keys(groupedMessages).map((date, index) => (
        <div key={date}>
          <h1 className="text-center m-auto my-1 text-sm  bg-[#252424] text-white p-1 font-[500] rounded-md  w-fit">
            {DateHeaderFormatter(date)}
          </h1>
          {groupedMessages[date]?.map((message: messageType) => (
            <div
              key={message.id}
              className={` mt-[6px] flex items-start gap-1 ${
                user?.uid === message.senderId ? "justify-end" : "justify-start"
              }`}
            >
              {user?.uid !== message.senderId && (
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={userData?.photoUrl}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              )}
              {message.type === "text" && <TextMessage message={message} />}
              {message.type === "image/png" && (
                <ImageMessage message={message} />
              )}
              {message.type === "application/pdf" && (
                <PdfMessage message={message} />
              )}
              {message.type === "video" && <VideoMessage message={message} />}
              {message.type === "audio" && <AudioMessage message={message} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Messages;
