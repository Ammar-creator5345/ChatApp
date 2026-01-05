import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { messageType } from "../../../../types/chatTypes";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import { ShowRecordingTime } from "../../../../utils/showRecordingTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideoOpenModal from "./videoOpenModal";
import MessageBubble from "./messageBubble";

type PropsTypes = {
  message: messageType;
};

const VideoMessage = ({ message }: PropsTypes) => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.onloadedmetadata = () => {
      setVideoDuration(videoRef?.current!.duration);
    };
  }, []);

  return (
    <>
      <VideoOpenModal
        open={open}
        setOpen={setOpen}
        fileUrl={message?.fileUrl}
      />
      <MessageBubble message={message}>
        <div className="flex flex-col max-w-[300px] gap-1">
          <div
            onClick={() => setOpen(true)}
            className="relative w-full h-[170px] rounded-md overflow-hidden cursor-pointer flex items-center justify-center"
          >
            <video
              src={message?.fileUrl}
              ref={videoRef}
              className="w-full h-full object-cover"
            />

            <button className="absolute bg-black/50 p-2 rounded-full flex items-center justify-center">
              <PlayArrowIcon fontSize="medium" sx={{ color: "white" }} />
            </button>

            <div className="absolute bottom-1 left-1 text-white text-[10px] flex items-center gap-1  px-1 rounded">
              <VideocamOutlinedIcon sx={{ fontSize: 12 }} />
              {ShowRecordingTime(videoDuration.toString())}
            </div>
            <div className="absolute bottom-1 right-1 flex items-center gap-1 text-white text-[10px]  px-1 rounded">
              {user?.uid === message.senderId &&
                renderStatusIcon(message.status)}
            </div>
          </div>
          {message?.text && (
            <p className="text-sm break-words px-1">{message.text}</p>
          )}
        </div>
      </MessageBubble>
    </>
  );
};

export default VideoMessage;
