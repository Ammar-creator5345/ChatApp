import { useState } from "react";
import { useAuth } from "../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../utils/timeFormatter";
import { messageType } from "../../../types/chatTypes";
import { renderStatusIcon } from "../../../utils/renderStatusIcon";
import ImageModal from "./imageModal";

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
      <div className={`${isSender ? "chatMessage-right" : "chatMessage-left"}`}>
        <div
          onClick={() => setOpen(true)}
          className="w-[300px] h-[180px] cursor-pointer"
        >
          <img
            src={message.fileUrl}
            alt="uploaded picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2 h-4 absolute text-white right-4 bottom-1]">
          <p className="text-[10px] whitespace-nowrap">
            {TimeFormatter(message.timestamp.seconds)}
          </p>
          {isSender && (
            <p className="pb-1">{renderStatusIcon(message.status)}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageMessage;
