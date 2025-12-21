import { Modal, Box } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VideocamIcon from "@mui/icons-material/Videocam";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoRecorder from "../videoRecorder";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import PhotoCapture, { PhotoCaptureRef } from "./photoCapture";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CameraModal({ open, setOpen }: Props) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [cameraType, setCameraType] = useState<"user" | "environment">("user");
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);
  const photoRef = useRef<PhotoCaptureRef>(null);
  const [isRecordingOn, setIsRecordingOn] = useState<boolean>(false);
  const style: Record<string, string | number> = {
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "410px",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "12px 22px 12px",
    borderRadius: "10px",
  };
  const handleMainAction: () => void = () => {
    if (mode === "photo") {
      photoRef.current?.takePhoto();
    } else {
      console.log("Handle video start/stop");
      setIsRecordingOn(true);
    }
  };
  const handleCloseModal: () => void = () => {
    setCameraType("user");
    setMode("photo");
    setIsPhotoTaken(false);
    setIsRecordingOn(false);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Take a {mode === "photo" ? "Photo" : "Video"}
          </h1>
          <button onClick={handleCloseModal}>
            <CloseIcon />
          </button>
        </div>

        {mode === "photo" ? (
          <PhotoCapture
            cameraType={cameraType}
            ref={photoRef}
            onCapture={() => setIsPhotoTaken(true)}
            onClear={() => setIsPhotoTaken(false)}
          />
        ) : (
          <VideoRecorder
            cameraType={cameraType}
            isRecordingOn={isRecordingOn}
            setIsRecordingOn={setIsRecordingOn}
          />
        )}

        {!isPhotoTaken && !isRecordingOn && (
          <div className="flex items-center gap-6 justify-center">
            <button
              onClick={() => {
                setCameraType((prev) =>
                  prev === "user" ? "environment" : "user"
                );
              }}
              className="p-[9px] rounded-full mt-4 flex items-center justify-center transition-all hover:bg-red-100"
            >
              <CameraswitchIcon sx={{ fontSize: "25px" }} />
            </button>
            <button
              onClick={handleMainAction}
              className="p-3 rounded-full mt-4 bg-green-500 flex items-center justify-center transition-all hover:bg-green-600"
            >
              {mode === "photo" ? <CameraAltIcon /> : <VideocamIcon />}
            </button>
            <button
              onClick={() => {
                setMode((prev) => (prev === "photo" ? "video" : "photo"));
              }}
              className="p-[9px] rounded-full mt-4 flex items-center justify-center transition-all hover:bg-red-100"
            >
              {mode === "photo" ? (
                <VideocamIcon sx={{ fontSize: "25px" }} />
              ) : (
                <CameraAltIcon />
              )}
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
}
