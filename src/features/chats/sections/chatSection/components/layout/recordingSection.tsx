import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import SendIcon from "@mui/icons-material/Send";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ShowRecordingTime } from "../../../../utils/showRecordingTime";

type PropsTypes = {
  stopRecording: () => void;
  setIsRecordingOn: Dispatch<SetStateAction<boolean>>;
  resetTimer: () => void;
  recordingTime: number;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  handleSendFile: (fileType: string, file: any) => void;
  mediaBlobUrl: string | undefined;
  clearBlobUrl: () => void;
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
  clearBlobUrl,
}: PropsTypes) => {
  const [shouldSend, setShouldSend] = useState<boolean>(false);

  useEffect(() => {
    if (mediaBlobUrl) {
      console.log("Audio blob ready:", mediaBlobUrl);
    }
  }, [mediaBlobUrl]);

  const handleDeleteRecording = () => {
    setShouldSend(false);
    stopRecording();
    setIsRecordingOn(false);
    resetTimer();
    setIsPaused(false);
    clearBlobUrl();
  };

  useEffect(() => {
    if (!mediaBlobUrl || !shouldSend) return;

    const sendAudio = async () => {
      const res = await fetch(mediaBlobUrl);
      const blob = await res.blob();
      handleSendFile("audio", blob);
      setIsRecordingOn(false);
      setIsPaused(false);
      setShouldSend(false);
      clearBlobUrl();
    };

    sendAudio();
  }, [mediaBlobUrl, shouldSend]);

  const handleSendAudio = () => {
    setShouldSend(true);
    stopRecording();
    resetTimer();
  };

  return (
    <div className="p-2 px-6 bg-white shadow-sm rounded-full">
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={handleDeleteRecording}
          className="rounded-full center p-1 transition-all hover:bg-[#e2dede]"
        >
          <DeleteIcon />
        </button>
        <div className="flex items-center gap-3">     
          <span>{ShowRecordingTime(recordingTime.toString())}</span>
        </div>
        <button
          className="rounded-full center p-1 transition-all hover:bg-[#e2dede]"
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? (
            <MicIcon sx={{ fontSize: "20px" }} />
          ) : (
            <PauseIcon sx={{ fontSize: "20px" }} />
          )}
        </button>
        <button
          onClick={handleSendAudio}
          className="p-2 center rounded-full bg-[#4dc24d] transition-all hover:scale-[1.1]"
        >
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default RecordingSection;
