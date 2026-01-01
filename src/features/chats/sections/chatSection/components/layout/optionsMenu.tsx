import { Popover } from "@mui/material";
import ButtonItem from "../../../../components/buttonItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplyIcon from "@mui/icons-material/Reply";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Dispatch, SetStateAction, useState } from "react";
import { messageType } from "../../../../types/chatTypes";
import { useChatContext } from "../../../../context/selectedUserContext";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import { deleteForAll, deleteForMe } from "../../../../services/messageService";
import { useAuth } from "../../../../../auth/context/authContext";

type PropsTypes = {
  open: boolean;
  id: string | undefined;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  selectedMessage: messageType | null;
};

const OptionsMenu = ({
  open,
  id,
  anchorEl,
  handleClose,
  selectedMessage,
}: PropsTypes) => {
  const MenuItemStyle: string =
    "flex items-center gap-2 rounded-md p-2 pr-[50px] hover:bg-[#e4e2e2]";
  const { user } = useAuth();
  const { selectedChat, setReplyMessage } = useChatContext();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"all" | "justMe" | null>(null);
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  // const [replyMessage, setReplyMessage] = useState<messageType | null>(null)


  const handleTextCopy = () => {
    navigator.clipboard.writeText(selectedMessage?.text || "");
    handleClose();
  };

  const handleDeleteForAll = async () => {
    if (!selectedMessage?.id || !selectedChat?.id || !user?.uid) return;
    await deleteForAll(selectedChat?.id, selectedMessage?.id, user?.uid);
    handleClose()
  }
  const handleDeleteForMe = async () => {
    if (!selectedMessage?.id || !selectedChat?.id || !user?.uid) return;
    await deleteForMe(selectedChat?.id, selectedMessage?.id, user?.uid);
    handleClose()
  }
  return (
    <>
      <DeleteConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDeleteForAll={handleDeleteForAll}
        handleDeleteForMe={handleDeleteForMe}
        setDeleteType={setDeleteType}
        selectedMessage={selectedMessage}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          zIndex: "100000000"
        }}
      >
        <div className="flex flex-col p-1">
          <ButtonItem
            icon={<ContentCopyIcon />}
            text="Copy"
            isMenu
            className={MenuItemStyle}
            handleClick={handleTextCopy}
          />
          <ButtonItem
            icon={<ReplyIcon />}
            text="Reply"
            isMenu
            className={MenuItemStyle}
            handleClick={() => {
              setReplyMessage(selectedMessage)
              handleClose()
            }}
          />
          <ButtonItem
            icon={<StarBorderIcon />}
            text="Star"
            isMenu
            className={MenuItemStyle}
          />
          <ButtonItem
            icon={<DeleteOutlineIcon />}
            text="Delete"
            isMenu
            className={MenuItemStyle}
            handleClick={() => {
              setOpenDeleteModal(true);
              handleClose();
            }}
          />
        </div>
      </Popover>
    </>
  );
};

export default OptionsMenu;
