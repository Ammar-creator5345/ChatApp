import { useState } from "react";
import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { messageType } from "../../../../types/chatTypes";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import ImageModal from "./imageModal";
import MessageBubble from "./messageBubble";

type PropsTypes = {
  message: messageType;
};

const ImageMessage = ({ message }: PropsTypes) => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const isSender = user?.uid === message.senderId;
  return (
    <>
      <ImageModal open={open} setOpen={setOpen} fileUrl={message?.fileUrl} />
      <MessageBubble message={message}>
        <div className="relative min-w-[250px] max-w-[300px]">
          <div
            onClick={() => setOpen(true)}
            className="h-[180px] cursor-pointer"
          >
            <img
              src={message.fileUrl}
              alt="uploaded picture"
              className="w-full h-full object-cover rounded"
            />
          </div>
          {message?.text && (
            <p className="w-full px-1 pt-1 text-sm">{message?.text}</p>
          )}
          <div className="flex items-center gap-2 h-4 absolute text-white right-1 bottom-0">
            <p className="text-[10px] whitespace-nowrap">
              {TimeFormatter(message.timestamp.seconds)}
            </p>
            {isSender && (
              <p className="pb-1">{renderStatusIcon(message.status)}</p>
            )}
          </div>
        </div>
      </MessageBubble>
    </>
  );
};

export default ImageMessage;
