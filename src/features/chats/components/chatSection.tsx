import { useEffect, useRef, useState } from "react";
import CameraModal from "./cameraModal";
import MenuPopover from "./menuPopover";
import { useReactMediaRecorder } from "react-media-recorder";
import { uploadFile } from "../../../services/cloudinary/uploadData";
import useMessages from "../hooks/useMessages";
import { messageType, SelectedChatTypes } from "../types/chatTypes";
import RecordingSection from "./recordingSection";
import InputSection from "./inputSection";
import Messages from "./messages";

type PropTypes = {
  selectedChat: SelectedChatTypes | null;
};

const ChatSection = ({ selectedChat }: PropTypes) => {
  const chatId = selectedChat?.id;
  const [text, setText] = useState<string>("");
  const { messages, sendMessage, sendFile } = useMessages(chatId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openCameraModal, setOpenCameraModal] = useState<boolean>(false);
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isRecordingOn, setIsRecordingOn] = useState<boolean>(false);
  const recordingRef = useRef<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const resumeTimer = () => {
    if (!recordingRef.current) {
      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      recordingRef.current = timer;
    }
  };
  const stopTimer = () => {
    if (recordingRef.current) {
      clearInterval(recordingRef.current);
      recordingRef.current = null;
    }
  };
  const resetTimer = () => {
    stopTimer();
    setRecordingTime(0);
  };
  const handleSendMessage = (): void => {
    sendMessage(text);
    setText("");
  };

  useEffect(() => {
    if (isPaused) {
      pauseRecording();
      stopTimer();
    } else {
      if (isRecordingOn) {
        resumeRecording();
        resumeTimer();
      }
    }
  }, [isPaused]);
  useEffect(() => {
    if (isRecordingOn) {
      resumeTimer();
    }
  }, [isRecordingOn]);

  const uploadData = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "file",
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      );
      formData.append("upload_preset", "chat_app");
      const res = await uploadFile(formData);
      console.log("uploaded File Response", res?.data);
      setUploadedFileUrl(res?.data?.url);
      await sendFile("image", res?.data?.url);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button
        onClick={() => uploadData()}
        className="border border-black p-2 rounded-md"
      >
        send Img
      </button>
      <MenuPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        setOpenCameraModal={setOpenCameraModal}
      />
      <CameraModal open={openCameraModal} setOpen={setOpenCameraModal} />

      <div className="mx-10">
        <Messages messages={messages} />

        {!isRecordingOn ? (
          <InputSection
            text={text}
            setText={setText}
            handleClick={handleClick}
            handleSendMessage={handleSendMessage}
            setIsRecordingOn={setIsRecordingOn}
            startRecording={startRecording}
          />
        ) : (
          <RecordingSection
            stopRecording={stopRecording}
            setIsRecordingOn={setIsRecordingOn}
            resetTimer={resetTimer}
            recordingTime={recordingTime}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        )}
      </div>
    </div>
  );
};

export default ChatSection;
