import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import SendIcon from "@mui/icons-material/Send";
import Webcam from "react-webcam";

export type PhotoCaptureRef = {
  takePhoto: () => void;
};

interface PhotoCapturePropTypes {
  cameraType: string;
  onCapture: () => void;
  onClear: () => void;
  handleSendFile: (fileType: string, file: any, fileText?: string) => void;
  handleCloseModal: () => void;
}

const PhotoCapture = forwardRef<PhotoCaptureRef, PhotoCapturePropTypes>(
  (
    {
      cameraType,
      onCapture,
      onClear,
      handleSendFile,
      handleCloseModal,
    }: PhotoCapturePropTypes,
    ref
  ) => {
    const [image, setImage] = useState<null | string>(null);
    const webcamRef = useRef<null | Webcam>(null);
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: cameraType || "selfie",
    };
    const handlePhotoClick = () => {
      if (webcamRef.current) {
        const photo = webcamRef.current.getScreenshot();
        setImage(photo);
        onCapture();
      }
    };
    useImperativeHandle(ref, () => ({
      takePhoto: handlePhotoClick,
    }));

    const handleSendCapturedImage = async () => {
      // const capturedImage = URL.createObjectURL(new Blob(image));
      await handleSendFile("image/png", image);
      handleCloseModal();
      setImage(null);
    };

    return (
      <div>
        {!image ? (
          <Webcam
            ref={webcamRef}
            mirrored={true}
            audio={false}
            height={720}
            screenshotFormat="image/png"
            width={1280}
            videoConstraints={videoConstraints}
            className="rounded-md"
          />
        ) : (
          <div className="mt-4">
            <img src={image as string} alt="" />
            <div className="mt-5 flex items-center justify-between mx-3">
              <button
                onClick={() => {
                  setImage(null);
                  onClear();
                }}
                className="p-2 rounded-lg flex items-center justify-center hover:bg-red-100"
              >
                <ReplayIcon />
              </button>
              <button
                onClick={handleSendCapturedImage}
                className="p-2 rounded-lg bg-green-500 flex items-center justify-center"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default PhotoCapture;
