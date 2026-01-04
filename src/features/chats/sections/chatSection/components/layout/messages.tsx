import { DateHeaderFormatter } from "../../../../utils/DateHeaderFormatter";
import { messageType } from "../../../../types/chatTypes";
import { useAuth } from "../../../../../auth/context/authContext";
import { useMemo, useRef, useState } from "react";
import AudioMessage from "./audioMessage";
import PdfMessage from "./pdfMessage";
import VideoMessage from "./videoMessage";
import ImageMessage from "./imageMessage";
import TextMessage from "./textMessage";
import { useChatContext } from "../../../../context/chatContext";
import OptionsMenu from "./optionsMenu";
import { MessageContext } from "../../context/messageContext";

type PropsTypes = {
  messages: null | messageType[];
  messagesLoading: boolean;
};

const Messages = ({ messages, messagesLoading: loading }: PropsTypes) => {
  const { user } = useAuth();
  const { setOpenDetailsDrawer } = useChatContext();
  const userData = useChatContext()?.selectedUserData;
  const messageRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);

  const groupedMessages = useMemo(() => {
    const groups: Record<string, messageType[]> = {};
    messages?.forEach((message) => {
      const dateKey = new Date(message.timestamp.seconds * 1000).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
    });
    return groups;
  }, [messages]);

  const scrollToMessage = (messageId: string) => {
    const ref = messageRef.current[messageId];
    if (!ref) return;
    ref.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedMessageId(messageId);
    setTimeout(() => {
      setHighlightedMessageId(null);
    }, 2000);
  };

  return (
    <MessageContext.Provider
      value={{ scrollToMessage, messageRef, highlightedMessageId }}
    >
      <div>
        {Object.keys(groupedMessages).map((date, index) => (
          <div key={date}>
            <h1 className="text-center m-auto my-1 text-sm  bg-[#252424] text-white p-1 font-[500] rounded-md w-fit">
              {DateHeaderFormatter(date)}
            </h1>
            {groupedMessages[date]?.map((message: messageType) => (
              <div
                key={message.id}
                className={` mt-[6px] flex items-start gap-2 transition-all ${
                  user?.uid === message.senderId
                    ? "justify-end"
                    : "justify-start"
                } ${highlightedMessageId === message.id ? "bg-[#93c994]" : ""}`}
              >
                {user?.uid !== message.senderId && (
                  <div
                    onClick={() => setOpenDetailsDrawer(true)}
                    className="w-10 h-10 cursor-pointer rounded-full overflow-hidden -translate-y-[2px]"
                  >
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
                {message.type === "video/mp4" && (
                  <VideoMessage message={message} />
                )}
                {message.type === "audio" && <AudioMessage message={message} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
};

export default Messages;
