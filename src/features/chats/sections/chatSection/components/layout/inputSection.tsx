import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EmojiPicker from "emoji-picker-react";
import AddIcon from '@mui/icons-material/Add';
import { AiOutlineSend } from "react-icons/ai";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import { BsFillSendFill } from "react-icons/bs";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChatContext } from "../../../../context/chatContext";
import { useAuth } from "../../../../../auth/context/authContext";

type PropsTypes = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSendMessage: () => void;
  setIsRecordingOn: Dispatch<SetStateAction<boolean>>;
  startRecording: () => void;
};

const InputSection = ({
  text,
  setText,
  handleClick,
  handleSendMessage,
  setIsRecordingOn,
  startRecording,
}: PropsTypes) => {
  const emojiDivRef = useRef<HTMLDivElement | null>(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const { replyMessage, setReplyMessage, selectedUserData } = useChatContext()
  const { user } = useAuth()
  const isSender = replyMessage?.senderId === user?.uid
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        emojiDivRef.current &&
        !emojiDivRef.current?.contains(e.target as Node)
      ) {
        setOpenEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {replyMessage && <div className="px-2 mb-2 max-w-full min-w-0">
        <div className="w-full min-w-0 max-w-full p-1 pt-2 px-3 rounded-md border-l-[4px] bg-white shadow-sm pb-2 border-l-green-500">
          <div className="relative w-full flex items-center justify-between">
            <p className="text-xs font-semibold text-green-700">
              Replying to {isSender ? "You" : selectedUserData?.displayName}
            </p>
            <button
              onClick={() => setReplyMessage(null)}
              type="button"
              className="w-6 h-6 center absolute top-0 right-0">
              <CloseSharpIcon sx={{ fontSize: "20px" }} />
            </button>
          </div>
          <p className="text-sm text-[#3a3939">
            {replyMessage?.text}</p>
        </div>
      </div>
      }

      <div className="bg-white relative flex items-center px-2 py-[2px] gap-1 rounded-3xl shadow-md">
        <div className="flex items-center gap-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenEmojiPicker((prev) => !prev);
            }}
            className="p-2 transition-all center rounded-full hover:bg-[#dfdede]"
          >
            <SentimentSatisfiedAltIcon />
          </button>
          <button
            onClick={handleClick}
            className="p-2 transition-all center rounded-full hover:bg-[#dfdede]"
          >
            <AttachFileOutlinedIcon className="rotate-[220deg]" />
          </button>
        </div>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Type a message"
          className="w-full p-3 pl-2 outline-none resize-none no-scrollbar"
          maxRows={4}
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        {text ? (
          <button
            onClick={handleSendMessage}
            className="p-2 center rounded-full bg-[#4dc24d] transition-all hover:scale-[1.1]"
          >
            {/* <SendIcon /> */}
            <AiOutlineSend size={20} />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsRecordingOn(true);
              startRecording();
            }}
            className="p-2 center rounded-full hover:bg-[#4dc24d]"
          >
            <MicNoneOutlinedIcon />
          </button>
        )}
        <div ref={emojiDivRef} className="absolute bottom-full mb-1">
          <EmojiPicker
            onEmojiClick={(obj) => setText((prev) => prev + obj.emoji)}
            open={openEmojiPicker}
            width={400}
          />
        </div>
      </div>
    </>

  );
};

export default InputSection;
