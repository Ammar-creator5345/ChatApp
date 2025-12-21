import { useEffect, useState } from "react";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonItem from "../../../../components/buttonItem";
import InfoOutlineTwoToneIcon from "@mui/icons-material/InfoOutlineTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useActiveUser from "../../../../../../shared/hooks/useActiveUser";
import { SelectedChatTypes } from "../../../../types/chatTypes";
import {
  blockUser,
  unBlockUser,
} from "../../../../../../shared/services/firebase/userService";
import ConfirmationModal from "../../../../components/layout/confirmationModal";
import AlertMessage from "../../../../../../shared/components/layout/alertMessage";
import {
  clearChat,
  deleteChat,
  toggleFavouriteChat,
} from "../../../../services/chatService";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import ChatHeaderSkeleton from "./chatheaderSkeleton";
import { useSelectedUserContext } from "../../../../context/selectedUserContext";
import { useAuth } from "../../../../../auth/context/authContext";

const menuItemStyle = "flex justify-center items-center gap-3 font-[400]";

type propsTypes = {
  selectedChat: SelectedChatTypes | null;
};

const ChatHeader = ({ selectedChat }: propsTypes) => {
  const {
    selectedUserData: userData,
    setSelectedChat,
    setOpenDetailsDrawer,
  } = useSelectedUserContext();
  const { isBlocked } = useActiveUser(selectedChat?.otherUid!);
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [modalAction, setModalAction] = useState<
    "block" | "delete" | "clear" | null
  >(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!selectedChat?.favourites || !user?.uid) return;
    const status = selectedChat.favourites[user.uid];
    setIsFavourite(status);
  }, [user, selectedChat]);

  const handleClickContactInfo = () => {
    setTimeout(() => {
      setOpenDetailsDrawer(true);
    }, 50);
    handleClose();
  };

  const handleClickCloseChat = () => {
    setSelectedChat(null);
    handleClose();
  };
  const modalTextMap: Record<string, string> = {
    block: `Are you sure you want to ${
      isBlocked ? "unblock" : "block"
    } this user?`,
    delete: "Are you sure you want to delete this chat",
    clear: "Are you sure you want to clear the chat",
  };

  const handleBlockUser = () => {
    if (!user?.uid || !selectedChat?.otherUid) return;
    if (isBlocked) {
      unBlockUser(user?.uid, selectedChat?.otherUid);
      setAlertMessage("user is unBlocked");
    } else {
      blockUser(user?.uid, selectedChat?.otherUid);
      setAlertMessage("user is blocked");
    }
    setShowAlert(true);
  };
  const handleFavouriteChat = () => {
    handleClose();
    if (!selectedChat?.id || !user?.uid) return;
    toggleFavouriteChat(selectedChat?.id, user?.uid, !isFavourite);
    setAlertMessage(
      !isFavourite ? "added to Favourites" : "Removed From Favourites"
    );
    setIsFavourite((prev) => !prev);
    setShowAlert(true);
  };
  const handleDeleteChat = async () => {
    if (!selectedChat?.id) return;
    setSelectedChat(null);
    await deleteChat(selectedChat?.id);
    setAlertMessage("Successfully Deleted the Chat!");
    setShowAlert(true);
  };

  const handleClearChat = async () => {
    if (!selectedChat?.id) return;
    await clearChat(selectedChat.id);
    setAlertMessage("Successfully Cleared the Chat!");
    setShowAlert(true);
  };

  return (
    <>
      <AlertMessage
        text={alertMessage}
        open={showAlert}
        onclose={() => setShowAlert(false)}
      />
      <ConfirmationModal
        text={modalAction ? modalTextMap[modalAction] : ""}
        open={!!modalAction}
        setOpen={() => setModalAction(null)}
        onConfirm={() => {
          if (modalAction === "block") handleBlockUser();
          if (modalAction === "delete") handleDeleteChat();
          if (modalAction === "clear") handleClearChat();
          setModalAction(null);
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem>
          <ButtonItem
            text="Contact Info"
            icon={<InfoOutlineTwoToneIcon />}
            isMenu={true}
            className={menuItemStyle}
            handleClick={handleClickContactInfo}
          />
        </MenuItem>
        <MenuItem>
          <ButtonItem
            text={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            icon={
              isFavourite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />
            }
            isMenu={true}
            className={menuItemStyle}
            handleClick={handleFavouriteChat}
          />
        </MenuItem>

        <MenuItem>
          <ButtonItem
            text="Close Chat"
            icon={<HighlightOffOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
            handleClick={handleClickCloseChat}
          />
        </MenuItem>

        <hr />
        <MenuItem>
          <ButtonItem
            text={isBlocked ? "Unblock" : "Block"}
            icon={<BlockTwoToneIcon />}
            isMenu={true}
            className={menuItemStyle}
            handleClick={() => {
              setModalAction("block");
              handleClose();
            }}
          />
        </MenuItem>

        <MenuItem>
          <ButtonItem
            text="Clear Chat"
            icon={<RemoveCircleOutlineOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
            handleClick={() => {
              setModalAction("clear");
              handleClose();
            }}
          />
        </MenuItem>
        <MenuItem>
          <ButtonItem
            text="Delete Chat"
            icon={<DeleteOutlineOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
            handleClick={() => {
              setModalAction("delete");
              handleClose();
            }}
          />
        </MenuItem>
      </Menu>

      {userData ? (
        <div className="bg-white cursor-pointer border-b border-b-black flex items-center justify-between p-2 pr-5">
          <div
            onClick={() => setOpenDetailsDrawer(true)}
            className="flex items-center gap-3 flex-1"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={userData?.photoUrl}
                alt="profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold">{userData?.displayName}</p>
              <p className="text-sm">
                {userData?.isOnline
                  ? userData.isOnline
                  : "Last online: " +
                    TimeFormatter(userData?.lastOnline.seconds as number)}
              </p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-1 rounded-lg transition-all center hover:bg-[#f0eeee]"
          >
            <MoreVertTwoToneIcon />
          </button>
        </div>
      ) : (
        <ChatHeaderSkeleton />
      )}
    </>
  );
};

export default ChatHeader;
