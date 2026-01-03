import { useAuth } from "../../../../../auth/context/authContext";
import { useChatContext } from "../../../../context/chatContext";
import { messageType } from "../../../../types/chatTypes";

const ReplyPreview = ({ message }: { message: messageType }) => {
  const { user } = useAuth();
  const isSender = message?.replyTo?.senderId === user?.uid;
  const { selectedUserData } = useChatContext();
  return (
    <div>
      {message.replyTo && (
        <div className="border-l-4 border-[#658532] bg-black/10 p-2 rounded-md mb-1 text-xs">
          <p className="font-semibold">
            {isSender ? "You" : selectedUserData?.displayName}
          </p>
          {message?.type === "text" && (
            <p className="truncate opacity-70">{message.replyTo.text}</p>
          )}
          {message?.type === "image/png" && <p>photo</p>}
          {message?.type === "image/png" && <p>photo</p>}
          {message?.type === "image/png" && <p>photo</p>}
        </div>
      )}
    </div>
  );
};

export default ReplyPreview;
