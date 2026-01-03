import Webcam from "react-webcam";
import ReplayIcon from "@mui/icons-material/Replay";
import SendIcon from "@mui/icons-material/Send";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import PauseIcon from "@mui/icons-material/Pause";
import { ReactMediaRecorder } from "react-media-recorder";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";

type PropsTypes = {
  cameraType: string;
  isRecordingOn: boolean;
  setIsRecordingOn: Dispatch<SetStateAction<boolean>>;
  handleSendFile: (fileType: string, file: any, fileText?: string) => void;
  handleCloseModal: () => void;
};

const VideoRecorder = ({
  cameraType,
  isRecordingOn,
  setIsRecordingOn,
  handleSendFile,
  handleCloseModal,
}: PropsTypes) => {
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isPauseButton, setIsPauseButton] = useState<boolean>(true);
  const recordingRef = useRef<any>(null);
  const timerRef = useRef<null | any>(null);
  const [isRecorded, setIsRecorded] = useState<boolean>(false);
  const [recordedUrl, setRecordedUrl] = useState<string | undefined>("");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: cameraType || "selfie",
  };
  const resumeTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const resetTimer = () => {
    stopTimer();
    setRecordingTime(0);
  };
  useEffect(() => {
    if (recordingRef.current && isRecordingOn) {
      recordingRef?.current?.startRecording();
      resumeTimer();
    }
  }, [isRecordingOn]);
  const handleVideoState = (
    resumeRecording: () => void,
    pauseRecording: () => void
  ) => {
    if (isPauseButton) {
      pauseRecording();
      stopTimer();
    } else {
      resumeRecording();
      resumeTimer();
    }
    setIsPauseButton((prev) => !prev);
  };

  const handleSendCapturedVideo = async () => {
    if (!recordedUrl) return;
    const blob = await fetch(recordedUrl).then((res) => res.blob());

    handleSendFile("video/mp4", blob);
    handleCloseModal();
    setRecordedUrl(undefined);
  };
  return (
    <div>
      {!isRecorded ? (
        <Webcam
          mirrored={true}
          audio={false}
          height={720}
          screenshotFormat="image/png"
          width={1280}
          videoConstraints={videoConstraints}
          className="rounded-md"
        />
      ) : (
        <video src={recordedUrl} autoPlay controls />
      )}
      {isRecorded && (
        <div className="mt-1">
          <div className="mt-5 flex items-center justify-between mx-3">
            <button
              onClick={() => {
                setIsRecorded(false);
                setIsRecordingOn(false);
              }}
              className="p-2 rounded-lg flex items-center justify-center hover:bg-red-100"
            >
              <ReplayIcon />
            </button>
            <button
              onClick={handleSendCapturedVideo}
              className="p-2 rounded-lg bg-green-500 flex items-center justify-center"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      <ReactMediaRecorder
        video
        render={({
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          pauseRecording,
          resumeRecording,
        }) => {
          recordingRef.current = { startRecording, mediaBlobUrl };
          setRecordedUrl(mediaBlobUrl);

          return (
            <div>
              {isRecordingOn && !isRecorded && (
                <div className="flex items-center justify-center gap-5 mt-4">
                  <p>
                    {String(Math.floor(recordingTime / 60)).padStart(2, "0")}:
                    {String(recordingTime % 60).padStart(2, "0")}
                  </p>

                  <button
                    onClick={() => {
                      setRecordedUrl(mediaBlobUrl);
                      stopRecording();
                      setIsRecorded(true);
                      resetTimer();
                    }}
                    className="p-2 rounded-full bg-red-200 flex items-center justify-center border border-black/50"
                  >
                    <StopIcon sx={{ fontSize: "30px" }} />
                  </button>
                  <button
                    onClick={() =>
                      handleVideoState(resumeRecording, pauseRecording)
                    }
                    className="p-2 rounded-full flex items-center justify-center hover:bg-red-100"
                  >
                    {isPauseButton ? (
                      <PauseIcon sx={{ fontSize: "25px" }} />
                    ) : (
                      <div className="p-[2px] border border-black flex items-center justify-center rounded-full">
                        <CircleIcon sx={{ fontSize: "20px" }} />
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default VideoRecorder;
