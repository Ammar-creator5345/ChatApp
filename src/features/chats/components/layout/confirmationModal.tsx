import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type propsTypes = {
  text: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};

const ConfirmationModal = ({ text, open, setOpen, onConfirm }: propsTypes) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="text-center text-xl font-bold">{text}</h1>
        <div className="center gap-4 mt-5">
          <button
            onClick={onConfirm}
            className="p-2 px-4 rounded-xl bg-red-300 font-semibold hover:bg-[#9e9797]"
          >
            Yeah
          </button>
          <button
            onClick={() => setOpen(false)}
            className="p-2 px-4 rounded-xl bg-red-300 font-semibold hover:bg-[#9e9797]"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
