import { DateHeaderFormatter } from "../utils/DateHeaderFormatter";
import { messageType } from "../types/chatTypes";
import { useAuth } from "../../../auth/authContext";
import { TimeFormatter } from "../../../utils/timeFormatter";
import { useMemo } from "react";
import { renderStatusIcon } from "../utils/renderStatusIcon";

type PropsTypes = {
  messages: null | messageType[];
};

const Messages = ({ messages }: PropsTypes) => {
  const { user } = useAuth();
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
          <h1 className="text-center m-auto my-1 bg-green-400 p-1 font-semibold rounded-md  w-fit">
            {DateHeaderFormatter(date)}
          </h1>
          {groupedMessages[date]?.map((message: messageType) => (
            <div
              key={message.id}
              className={` mt-[6px] bg-red-600 flex items-center gap-3 ${
                user?.uid === message.senderId ? "justify-end" : "justify-start"
              }`}
            >
              {user?.uid !== message.senderId && (
                <div className="w-12 h-12 bg-black rounded-full"></div>
              )}
              {message.type === "text" && (
                <div
                  className={`${
                    user?.uid === message.senderId
                      ? "chatMessage-right"
                      : "chatMessage-left"
                  }`}
                >
                  <p className="text-[17px]">{message.text}</p>
                  <p className="text-[10px] pt-3 whitespace-nowrap">
                    {TimeFormatter(message.timestamp.seconds)}
                  </p>
                  <div>
                    {user?.uid === message.senderId &&
                      renderStatusIcon(message.status)}
                  </div>
                </div>
              )}
              {message.type === "image" && (
                <div
                  className={`${
                    user?.uid === message.senderId
                      ? "chatMessage-right"
                      : "chatMessage-left"
                  }`}
                >
                  <div className="w-[200px] h-[200px] bg-red-500">
                    <img
                      src={message.fileUrl}
                      alt="uploaded picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2 absolute text-white right-4 bottom-0">
                    <p className="text-[10px] whitespace-nowrap">
                      {TimeFormatter(message.timestamp.seconds)}
                    </p>
                    <p className="pb-1">
                      {user?.uid === message.senderId &&
                        renderStatusIcon(message.status)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Messages;
