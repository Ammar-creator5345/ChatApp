import { DateHeaderFormatter } from "../../../../utils/DateHeaderFormatter";
import { messageType } from "../../../../types/chatTypes";
import { useAuth } from "../../../../../auth/context/authContext";
import { useMemo, useState } from "react";
import AudioMessage from "./audioMessage";
import PdfMessage from "./pdfMessage";
import VideoMessage from "./videoMessage";
import ImageMessage from "./imageMessage";
import TextMessage from "./textMessage";
import { useSelectedUserContext } from "../../../../context/selectedUserContext";
import OptionsMenu from "./optionsMenu";

type PropsTypes = {
  messages: null | messageType[];
  messagesLoading: boolean;
};

const Messages = ({ messages, messagesLoading: loading }: PropsTypes) => {
  const { user } = useAuth();
  const { setOpenDetailsDrawer } = useSelectedUserContext();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const userData = useSelectedUserContext()?.selectedUserData;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const MenuId = openMenu ? "simple-popover" : undefined;
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
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
    <>
      <OptionsMenu
        open={openMenu}
        id={MenuId}
        anchorEl={anchorEl}
        handleClose={handleCloseMenu}
      />
      <div>
        {Object.keys(groupedMessages).map((date, index) => (
          <div key={date}>
            <h1 className="text-center m-auto my-1 text-sm  bg-[#252424] text-white p-1 font-[500] rounded-md  w-fit">
              {DateHeaderFormatter(date)}
            </h1>
            {groupedMessages[date]?.map((message: messageType) => (
              <div
                key={message.id}
                className={` mt-[6px] flex items-start gap-2 ${
                  user?.uid === message.senderId
                    ? "justify-end"
                    : "justify-start"
                }`}
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
                {message.type === "text" && <TextMessage message={message} handleClick={handleClickMenu}/>}
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
    </>
  );
};

export default Messages;
