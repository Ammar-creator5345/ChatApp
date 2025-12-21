import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type PropsTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fileUrl: string;
};

const VideoOpenModal = ({ open, setOpen, fileUrl }: PropsTypes) => {
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "fixed",
    inset: 0,
    bgcolor: "#1e1e1e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <button
          onClick={handleClose}
          className="fixed top-5 left-5 p-2 px-[10px] rounded-md border border-[#2c2c2c] flex items-center justify-center transition-all hover:bg-[#494848]"
        >
          <ArrowBackOutlinedIcon className="text-white" />
        </button>
        <div className="max-w-[350px] p-2 h-full flex items-center justify-center ">
          <video
            src={fileUrl}
            controls
            autoPlay
            className="w-full max-w-full max-h-full h-full object-contain bg-black"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default VideoOpenModal;
