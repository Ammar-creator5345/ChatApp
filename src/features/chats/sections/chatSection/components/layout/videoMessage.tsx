import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { messageType } from "../../../../types/chatTypes";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import { ShowRecordingTime } from "../../../../utils/showRecordingTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideoOpenModal from "./videoOpenModal";

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
      setVideoDuration(videoRef.current!.duration);
    };
  }, []);

  return (
    <>
      <VideoOpenModal
        open={open}
        setOpen={setOpen}
        fileUrl={message?.fileUrl}
      />
      <div
        className={`${
          user?.uid === message.senderId
            ? "chatMessage-right"
            : "chatMessage-left"
        }`}
      >
        <div
          onClick={() => setOpen(true)}
          className="w-[300px] h-[170px] flex items-center justify-center cursor-pointer"
        >
          <video
            src={message?.fileUrl}
            ref={videoRef}
            width="100%"
            height="100%"
            className="rounded-md"
          ></video>
          <button className="bg-red-400/60 p-2 rounded-full flex items-center justify-center absolute">
            <PlayArrowIcon />
          </button>
        </div>
        <div className="flex h-4 items-center justify-between text-[10px] absolute right-4 bottom-3 w-full">
          <div className="pl-8 pt-2 flex items-center justify-center gap-[2px]">
            <VideocamOutlinedIcon
              sx={{ fontSize: "17px", color: "white", paddingBottom: "1px" }}
            />
            <p className="text-white">
              {ShowRecordingTime(videoDuration.toString())}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2  text-white ">
            <p className="text-[10px] whitespace-nowrap">
              {TimeFormatter(message.timestamp.seconds)}
            </p>
            <p className="pb-1">
              {user?.uid === message.senderId &&
                renderStatusIcon(message.status)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoMessage;
