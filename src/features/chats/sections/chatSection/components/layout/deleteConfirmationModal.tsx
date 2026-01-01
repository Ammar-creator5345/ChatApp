import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { messageType } from "../../../../types/chatTypes";
import { useAuth } from "../../../../../auth/context/authContext";

type propsTypes = {
  open: boolean;
  handleClose: () => void;
  handleDeleteForAll: () => void;
  handleDeleteForMe: () => void;
  setDeleteType: Dispatch<SetStateAction<"all" | "justMe" | null>>;
  selectedMessage: messageType | null
};

const DeleteConfirmationModal = ({
  open,
  handleClose,
  handleDeleteForAll,
  handleDeleteForMe,
  setDeleteType,
  selectedMessage
}: propsTypes) => {
  const { user } = useAuth()
  const isSender = selectedMessage?.senderId === user?.uid
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "20px",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="font-bold text-xl">Delete Message???</h1>
        <div className="mt-6 flex flex-col gap-3 items-end">
          {isSender && <button
            onClick={() => {
              handleDeleteForAll()
              handleClose();
            }}
            className="border p-2 px-4 rounded-full center font-[500] border-black/20 text-[#348634] hover:bg-yellow-50"
          >
            Delete for everyone
          </button>}
          <button
            onClick={() => {
              handleDeleteForMe()
              handleClose();
            }}
            className="border p-2 px-4 rounded-full center font-[500] border-black/20 text-[#348634] hover:bg-yellow-50"
          >
            Delete for me
          </button>
          <button
            onClick={handleClose}
            className="border p-2 px-4 rounded-full center font-[500] border-black/20 text-[#348634] hover:bg-yellow-50"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
