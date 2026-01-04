import { useEffect } from "react";
import { useAuth } from "../../../../../auth/context/authContext";
import { useChatContext } from "../../../../context/chatContext";
import { messageType } from "../../../../types/chatTypes";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useMessageContext } from "../../context/messageContext";

const ReplyPreview = ({ message }: { message: messageType }) => {
  const { user } = useAuth();
  const isSender = message?.replyTo?.senderId === user?.uid;
  const { selectedUserData, replyMessage } = useChatContext();
  const { messageRef, scrollToMessage } = useMessageContext();

  useEffect(() => {
    if (!replyMessage) return;
    console.log(replyMessage);
  }, [replyMessage]);
  return (
    <div>
      {message.replyTo && (
        <div
          onClick={() => scrollToMessage(message?.replyTo?.messageId)}
          className="border-l-4 border-[#658532] bg-black/10 rounded-md mb-1 text-xs cursor-pointer"
        >
          {message?.replyTo.type === "text" && (
            <div className="p-2">
              <p className="font-semibold">
                {isSender ? "You" : selectedUserData?.displayName}
              </p>
              <p className="truncate opacity-70">{message.replyTo.text}</p>
            </div>
          )}
          {message?.replyTo.type === "video/mp4" && (
            <div className="flex items-center gap-3">
              <div className="p-2">
                <p className="font-semibold">
                  {isSender ? "You" : selectedUserData?.displayName}
                </p>
                <div className="flex items-center gap-[2px] mt-1">
                  <VideocamOutlinedIcon sx={{ fontSize: "17px" }} />
                  <span>Video</span>
                </div>
              </div>
            </div>
          )}

          {message?.replyTo.type === "audio" && (
            <div className="flex items-center gap-3">
              <div className="p-2">
                <p className="font-semibold">
                  {isSender ? "You" : selectedUserData?.displayName}
                </p>
                <div className="flex items-center gap-[2px] mt-1">
                  <MicOutlinedIcon sx={{ fontSize: "17px" }} />
                  <span>Audio</span>
                </div>
              </div>
            </div>
          )}
          {message?.replyTo.type === "application/pdf" && (
            <div className="flex items-center gap-3">
              <div className="p-2">
                <p className="font-semibold">
                  {isSender ? "You" : selectedUserData?.displayName}
                </p>
                <div className="flex items-center gap-[2px] mt-1">
                  <DescriptionOutlinedIcon sx={{ fontSize: "17px" }} />
                  <span>Document</span>
                </div>
              </div>
            </div>
          )}
          {message?.replyTo.type === "image/png" && (
            <div className="flex items-center gap-3">
              <div className="p-2">
                <p className="font-semibold">
                  {isSender ? "You" : selectedUserData?.displayName}
                </p>
                <div className="flex items-center gap-[2px] mt-1">
                  <InsertPhotoOutlinedIcon sx={{ fontSize: "17px" }} />
                  <span>Photo</span>
                </div>
              </div>
              <img
                src={message?.replyTo?.file as string}
                alt="reply picture"
                className="w-10 aspect-square rounded-sm object-conver"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyPreview;
