import { useAuth } from "../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../utils/timeFormatter";
import { messageType } from "../../../types/chatTypes";
import { renderStatusIcon } from "../../../utils/renderStatusIcon";

type PropsTypes = {
  message: messageType;
};

const TextMessage = ({ message }: PropsTypes) => {
  const { user } = useAuth();
  const isSender = user?.uid === message.senderId;
  return (
    <div className={`${isSender ? "chatMessage-right" : "chatMessage-left"}`}>
      <p className="text-[15px]">{message.text}</p>
      <div className="flex items-end gap-2 h-4">
        <p className="text-[10px] whitespace-nowrap">
          {TimeFormatter(message.timestamp.seconds)}
        </p>
        {isSender && (
          <p className="translate-y-[2px]">
            {renderStatusIcon(message.status)}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextMessage;
