import { ChangeEvent, useEffect, useRef, useState } from "react";
import CameraModal from "./components/layout/cameraModal";
import MenuPopover from "./components/layout/menuPopover";
import { useReactMediaRecorder } from "react-media-recorder";
import useMessages from "../../hooks/useMessages";
import { messageType, SelectedChatTypes } from "../../types/chatTypes";
import RecordingSection from "./components/layout/recordingSection";
import InputSection from "./components/layout/inputSection";
import Messages from "./components/layout/messages";
import FileDrawer from "./components/layout/fileDrawer";
import ChatHeader from "./components/layout/chatHeader";
import useActiveUser from "../../../../shared/hooks/useActiveUser";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AlertMessage from "../../../../shared/components/layout/alertMessage";

type PropTypes = {
  selectedChat: SelectedChatTypes | null;
};

const ChatSection = ({ selectedChat }: PropTypes) => {
  const chatId = selectedChat?.id;
  const [text, setText] = useState<string>("");
  const { messages, sendMessage, sendFile, messagesLoading } =
    useMessages(chatId);
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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<Record<string, any>>({});
  const { activeUser, isBlocked } = useActiveUser(selectedChat?.otherUid!);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
    setImage("");
    setFile({});
  };

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
  const handleSendMessage = async (): Promise<void> => {
    if (!selectedChat?.otherUid) return;
    setText("");
    const res = await sendMessage(text, selectedChat?.otherUid);
    if (res?.success === false) {
      setShowAlert(true);
      setAlertMessage("You can't send message to this user");
    }
  };

  const handleSendFile = async (fileType: string, file: any) => {
    const res = await sendFile(fileType, file);
    setOpenDrawer(false);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SUPABASE_URL);
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

  const handlePhotosPicker = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log("event", e);
    if (e.target.files) {
      const files = e.target.files[0];
      setFile(files);
      const createdUrl = URL.createObjectURL(files);
      setImage(createdUrl);
      console.log(files);
      setOpenDrawer(true);
      e.target.value = "";
    }
  };
  const handleDocumentPicker = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = e.target.files[0];
      console.log(files);
      setImage(
        "https://img.freepik.com/free-vector/files-blue-colour_78370-6661.jpg?semt=ais_incoming&w=740&q=80"
      );
      setFile(files);
      setOpenDrawer(true);
      e.target.value = "";
    }
  };
  useEffect(() => {
    console.log("selectedChatt", selectedChat);
  }, [selectedChat]);
  return (
    <div>
      <AlertMessage
        text={alertMessage}
        open={showAlert}
        error={true}
        onclose={() => setShowAlert(false)}
      />
      <MenuPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        setOpenCameraModal={setOpenCameraModal}
        handleDocumentPicker={handleDocumentPicker}
        handlePhotosPicker={handlePhotosPicker}
      />
      <FileDrawer
        file={file}
        image={image}
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        handleSendFile={handleSendFile}
      />
      <CameraModal open={openCameraModal} setOpen={setOpenCameraModal} />
      <div className="flex flex-col h-screen">
        <div>
          <ChatHeader selectedChat={selectedChat} />
        </div>
        <div className="pr-10 pl-4 flex-1 overflow-y-auto py-3 messages_scrollbar">
          <Messages messages={messages} messagesLoading={messagesLoading} />
        </div>
        {!isBlocked ? (
          <div className="rounded-full mx-3 mb-3">
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
                handleSendFile={handleSendFile}
                mediaBlobUrl={mediaBlobUrl}
              />
            )}
          </div>
        ) : (
          <div className="center gap-1 p-3 border-t border-t-[#d1cece] text-sm shadow-[0px_0px_7px_#d1cece]">
            <BlockOutlinedIcon sx={{ fontSize: "20px" }} />
            <p className="font-[500]">You can't send messages to this user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
