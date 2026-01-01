import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { messageType } from "../../../../types/chatTypes";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import { ReactComponent as DropdownIcon } from "../../../../../../assets/icons/dropdown.svg";
import { Dispatch, SetStateAction } from "react";
import BlockFlippedIcon from "@mui/icons-material/BlockFlipped";

type PropsTypes = {
  message: messageType;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSelectedMessage: Dispatch<SetStateAction<messageType | null>>;
};

const TextMessage = ({
  message,
  handleClick,
  setSelectedMessage,
}: PropsTypes) => {
  const { user } = useAuth();
  const isSender = user?.uid === message.senderId;
  return (
    <div
      className={`${isSender ? "chatMessage-right" : "chatMessage-left"} group`}
    >
      {!message?.deletedForAll && <button
        onClick={(e) => {
          setSelectedMessage(message);
          handleClick(e);
        }}
        className="absolute top-3 right-2 opacity-0 bg-[#c2bfbf] transition-all rounded-lg z-[44444] group-hover:opacity-100"
      >
        <DropdownIcon className="w-4 h-4" />
      </button>}
      {message.text ? (
        <p className="text-[15px]">{message?.text}</p>
      ) : (
        message.deletedForAll && (
          <div className="text-sm italic center gap-1">
            <BlockFlippedIcon sx={{ fontSize: "18px" }} />
            <p>
              {isSender
                ? "You deleted this message"
                : "This message was deleted"}
            </p>
          </div>
        )
      )}
      <div className="flex items-end gap-2 h-4">
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
  );
};

export default TextMessage;
