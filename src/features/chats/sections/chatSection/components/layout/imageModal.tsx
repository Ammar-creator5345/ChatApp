import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type PropsTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fileUrl: string;
};

const ImageModal = ({ open, setOpen, fileUrl }: PropsTypes) => {
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
        <div className="w-full px-10 py-4 h-full flex items-center justify-center ">
          <img
            src={fileUrl}
            alt="it is opened image"
            className="w-full h-full object-contain"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default ImageModal;
