import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { messageType } from "../../../../types/chatTypes";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import { ReactComponent as DropdownIcon } from "../../../../../../assets/icons/dropdown.svg";

type PropsTypes = {
  message: messageType;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const TextMessage = ({ message, handleClick }: PropsTypes) => {
  const { user } = useAuth();
  const isSender = user?.uid === message.senderId;
  return (
    <div
      className={`${isSender ? "chatMessage-right" : "chatMessage-left"} group`}
    >
      <button
        onClick={handleClick}
        className="absolute p-1 top-2 right-2 opacity-0 bg-[#c2bfbf] transition-all rounded-lg z-[44444] group-hover:opacity-100"
      >
        <DropdownIcon className="w-4 h-4" />
      </button>
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
