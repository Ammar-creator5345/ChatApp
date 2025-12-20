import ButtonItem from "../../../../components/buttonItem";
import { Popover, Typography } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import { ChatListTypes } from "../../../../types/chatTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../../../../auth/context/authContext";
import {
  clearChat,
  deleteChat,
  toggleFavouriteChat,
} from "../../../../services/chatService";
import AlertMessage from "../../../../../../shared/components/layout/alertMessage";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useSelectedUserContext } from "../../../../context/selectedUserContext";
import ConfirmationModal from "../../../../components/layout/confirmationModal";
import {
  blockUser,
  unBlockUser,
} from "../../../../../../shared/services/firebase/userService";
import useActiveUser from "../../../../../../shared/hooks/useActiveUser";

type propsTypes = {
  openPopover: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  id: "simple-popover" | undefined;
  chat: ChatListTypes | null;
};

const PopOver = ({
  openPopover,
  handleClose,
  anchorEl,
  id,
  chat,
}: propsTypes) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { setSelectedChat } = useSelectedUserContext();
  const [modalAction, setModalAction] = useState<
    "block" | "delete" | "clear" | null
  >(null);
  const { isBlocked } = useActiveUser(chat?.otherUid!);
  const modalTextMap: Record<string, string> = {
    block: `Are you sure you want to ${
      isBlocked ? "unblock" : "block"
    } this user?`,
    delete: "Are you sure you want to delete this chat?",
    clear: "Are you sure you want to clear this chat?",
  };

  useEffect(() => {
    console.log(chat);
    if (!chat || !user?.uid) return;
    const status = chat?.favourites?.[user?.uid];
    setIsFavourite(status);
  }, [chat, user]);

  const handleFavouriteChat = () => {
    if (!chat?.id || !user?.uid) return;
    toggleFavouriteChat(chat.id, user?.uid, !isFavourite);
    setAlertMessage(
      !isFavourite ? "added to Favourites" : "Removed From Favourites"
    );
    setIsFavourite((prev) => !prev);
    setShowAlert(true);
  };
  const handleDeleteChat = async () => {
    if (!chat?.id) return;
    setSelectedChat(null);
    await deleteChat(chat?.id);
    setAlertMessage("Successfully Deleted the Chat!");
    setShowAlert(true);
  };
  const handleBlockUser = () => {
    if (!user?.uid || !chat?.id) return;
    if (isBlocked) {
      unBlockUser(user?.uid, chat.otherUid);
      setAlertMessage("user is unBlocked");
    } else {
      blockUser(user?.uid, chat.otherUid);
      setAlertMessage("user is blocked");
    }
    setShowAlert(true);
  };

  const handleClearChat = async () => {
    if (!chat?.id) return;
    setSelectedChat(null);
    await clearChat(chat.id);
    setAlertMessage("Successfully Cleared the Chat!");
    setShowAlert(true);
  };

  return (
    <>
      <ConfirmationModal
        text={modalAction ? modalTextMap[modalAction] : ""}
        open={!!modalAction}
        setOpen={() => setModalAction(null)}
        onConfirm={() => {
          if (modalAction === "delete") handleDeleteChat();
          if (modalAction === "block") handleBlockUser();
          if (modalAction === "clear") handleClearChat();
          setModalAction(null);
        }}
      />
      <AlertMessage
        text={alertMessage}
        open={showAlert}
        onclose={() => setShowAlert(false)}
      />
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <ButtonItem
          icon={<RemoveCircleOutlineOutlinedIcon />}
          text="Clear chat"
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
          handleClick={() => {
            setModalAction("clear");
            handleClose();
          }}
        />
        <ButtonItem
          icon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          text={`${isFavourite ? "Remove from" : "Add to"} favourites`}
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
          handleClick={() => {
            handleClose();
            handleFavouriteChat();
          }}
        />
        <ButtonItem
          icon={<BlockTwoToneIcon />}
          text={isBlocked ? "Unblock" : "Block"}
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
          handleClick={() => {
            setModalAction("block");
            handleClose();
          }}
        />
        <ButtonItem
          icon={<DeleteIcon />}
          text="Delete chat"
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
          handleClick={() => {
            setModalAction("delete");
            handleClose();
          }}
        />
      </Popover>
    </>
  );
};

export default PopOver;
