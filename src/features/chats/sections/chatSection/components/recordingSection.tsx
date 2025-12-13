import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import SendIcon from "@mui/icons-material/Send";
import { Dispatch, SetStateAction, useEffect } from "react";

type PropsTypes = {
  stopRecording: () => void;
  setIsRecordingOn: Dispatch<SetStateAction<boolean>>;
  resetTimer: () => void;
  recordingTime: number;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  handleSendFile: (fileType: string, file: any) => void;
  mediaBlobUrl: string | undefined;
};

const RecordingSection = ({
  stopRecording,
  setIsRecordingOn,
  resetTimer,
  recordingTime,
  isPaused,
  setIsPaused,
  handleSendFile,
  mediaBlobUrl,
}: PropsTypes) => {
  useEffect(() => {
    if (mediaBlobUrl) {
      console.log("Audio blob ready:", mediaBlobUrl);
    }
  }, [mediaBlobUrl]);
  const handleSendAudio = async () => {
    stopRecording();
    resetTimer();
    if (!mediaBlobUrl) return;
    const res = await fetch(mediaBlobUrl);
    const blob = await res.blob();
    handleSendFile("audio", blob);
    setIsRecordingOn(false);
  };

  return (
    <div className="p-3 px-6 bg-red-300">
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={() => {
            stopRecording();
            setIsRecordingOn(false);
            resetTimer();
          }}
        >
          <DeleteIcon />
        </button>
        <div className="flex items-center gap-3">
          <span>
            {Math.floor(recordingTime / 60)
              .toString()
              .padStart(2, "0")}
            <span>:</span>
            <span>{(recordingTime % 60).toString().padStart(2, "0")}</span>
          </span>
        </div>
        <button onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? <MicIcon /> : <PauseIcon />}
        </button>
        <button
          onClick={handleSendAudio}
          className="bg-green-600 p-2 py-[6px] rounded-md flex items-center justify-center transition-all hover:bg-green-700"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default RecordingSection;
