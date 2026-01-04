import BlockFlippedIcon from "@mui/icons-material/BlockFlipped";
import { messageType } from "../../../../types/chatTypes";
import MessageBubble from "./messageBubble";
import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";

type TextMessageTypes = {
  message: messageType;
};

const TextMessage = ({ message }: TextMessageTypes) => {
  const { user } = useAuth();
  const isSender = message?.senderId === user?.uid;
  return (
    <MessageBubble message={message}>
      <div className="mx-1 flex items-end gap-2">
        <p className="text-[15px]">{message?.text}</p>
        <div className="flex items-end gap-1 h-4">
          <p className="text-[10px] whitespace-nowrap">
            {TimeFormatter(message.timestamp.seconds)}
          </p>
          {isSender && message?.text && (
            <p className="translate-y-[2px]">
              {renderStatusIcon(message.status)}
            </p>
          )}
        </div>
      </div>
    </MessageBubble>
  );
};

export default TextMessage;
