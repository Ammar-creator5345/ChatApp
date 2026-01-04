import { ReactNode, useState } from "react";
import { messageType } from "../../../../types/chatTypes";
import ReplyPreview from "./replyPreview";
import { useAuth } from "../../../../../auth/context/authContext";
import { ReactComponent as DropdownIcon } from "../../../../../../assets/icons/dropdown.svg";
import OptionsMenu from "./optionsMenu";
import { useMessageContext } from "../../context/messageContext";
import BlockFlippedIcon from "@mui/icons-material/BlockFlipped";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";

type MessageBubbleTypes = {
  message: messageType;
  children: ReactNode;
};

const MessageBubble = ({ message, children }: MessageBubbleTypes) => {
  const { user } = useAuth();
  const { messageRef } = useMessageContext();
  const isSender = message?.senderId === user?.uid;
  const [selectedMessage, setSelectedMessage] = useState<messageType | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const MenuId = openMenu ? "simple-popover" : undefined;
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <OptionsMenu
        open={openMenu}
        id={MenuId}
        anchorEl={anchorEl}
        handleClose={handleCloseMenu}
        selectedMessage={selectedMessage}
      />
      <div
        ref={(el) => {
          messageRef.current[message.id] = el;
        }}
        className={`${
          isSender ? "chatMessage-right" : "chatMessage-left"
        } group`}
      >
        <ReplyPreview message={message} />
        {!message?.deletedForAll ? (
          children
        ) : (
          <div className="flex items-end gap-2 px-1">
            <div className="text-sm italic center gap-1">
              <BlockFlippedIcon sx={{ fontSize: "18px" }} />
              <p>
                {isSender
                  ? "You deleted this message"
                  : "This message was deleted"}
              </p>
            </div>
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
        )}
        {!message?.deletedForAll && (
          <button
            onClick={(e) => {
              setSelectedMessage(message);
              handleClickMenu(e);
            }}
            className="absolute top-2 right-2 opacity-0 bg-[#c2bfbf] transition-all rounded-lg z-[44444] group-hover:opacity-100"
          >
            <DropdownIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
};

export default MessageBubble;
