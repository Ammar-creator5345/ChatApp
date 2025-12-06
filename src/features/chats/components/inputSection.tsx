import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EmojiPicker from "emoji-picker-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
    <div className="bg-red-300 relative flex items-center gap-1">
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenEmojiPicker((prev) => !prev);
          }}
          className="p-2 rounded-md hover:bg-red-400"
        >
          <SentimentSatisfiedAltIcon />
        </button>
        <button
          onClick={handleClick}
          className="p-2 rounded-md hover:bg-red-400"
        >
          <AttachFileOutlinedIcon className="rotate-[220deg]" />
        </button>
      </div>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Type a message"
        className="w-full p-3 outline-none resize-none no-scrollbar"
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
          className="p-2 rounded-md hover:bg-red-400"
        >
          <SendIcon />
        </button>
      ) : (
        <button
          onClick={() => {
            setIsRecordingOn(true);
            startRecording();
          }}
          className="p-2 rounded-md hover:bg-red-400"
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
  );
};

export default InputSection;
