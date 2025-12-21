import WavesurferPlayer from "@wavesurfer/react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { messageType } from "../../../../types/chatTypes";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";
import { useAuth } from "../../../../../auth/context/authContext";
import {
  showCurrentRecordingTime,
  ShowRecordingTime,
} from "../../../../utils/showRecordingTime";

type PropsTypes = {
  message: messageType;
};

const AudioMessage = ({ message }: PropsTypes) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // ⬅️ Timer state
  const { user } = useAuth();

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    ws.on("audioprocess", () => {
      setCurrentTime(ws.getCurrentTime());
    });
    ws.on("seek", () => {
      setCurrentTime(ws.getCurrentTime());
    });
    ws.on("pause", () => {
      setCurrentTime(ws.getCurrentTime());
    });
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const isSender = user?.uid === message.senderId;

  return (
    <div className={isSender ? "chatMessage-right" : "chatMessage-left"}>
      <div className="bg-red-500 rounded-xl p-3 pb-0 w-[260px] flex flex-col gap-2 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayPause}
            className="bg-white text-red-600 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>

          <div className="flex-1 min-w-0">
            <WavesurferPlayer
              height={40}
              waveColor="#bcb3b3"
              progressColor="#ffdddd"
              cursorColor="white"
              cursorWidth={2}
              barWidth={2}
              barGap={2}
              url={message.fileUrl}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>

        <div className="flex h-4 items-center justify-between text-white text-[11px]">
          <span>
            {isPlaying
              ? showCurrentRecordingTime(currentTime.toString())
              : ShowRecordingTime(wavesurfer?.getDuration()?.toFixed() || "0")}
          </span>
          <div className="flex items-center gap-2">
            <span>{TimeFormatter(message.timestamp.seconds)}</span>
            {isSender && (
              <span className="mb-[3px]">
                {renderStatusIcon(message.status)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioMessage;
