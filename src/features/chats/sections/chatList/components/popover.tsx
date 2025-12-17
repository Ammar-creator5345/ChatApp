import ButtonItem from "../../../components/buttonItem";
import { Popover, Typography } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import { ChatListTypes } from "../../../types/chatTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../../../auth/context/authContext";
import { deleteChat, toggleFavouriteChat } from "../../../services/chatService";
import AlertMessage from "../../../../../shared/components/layout/alertMessage";
import { useSelectedUserContext } from "../../../context/selectedUserContext";

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

  return (
    <>
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
          icon={<MarkEmailUnreadIcon />}
          text="Mark as unread"
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
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
          text="Block"
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
        />
        <ButtonItem
          icon={<DeleteIcon />}
          text="Delete chat"
          isMenu={true}
          className="flex items-center gap-4 w-full p-2 hover:bg-[#e4e2e2]"
          handleClick={() => {
            handleClose();
            handleDeleteChat();
          }}
        />
      </Popover>
    </>
  );
};

export default PopOver;
