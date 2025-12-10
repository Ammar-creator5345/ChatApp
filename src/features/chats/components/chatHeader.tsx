import { useEffect, useState } from "react";
import { useSelectedUserContext } from "../context/selectedUserContext";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonItem from "./buttonItem";
import InfoOutlineTwoToneIcon from "@mui/icons-material/InfoOutlineTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const menuItemStyle = "flex justify-center items-center gap-3 font-[400]";

const ChatHeader = () => {
  const context = useSelectedUserContext();
  const userData = context?.selectedUserData;
  const { setOpenDetailsDrawer } = useSelectedUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!userData) return;
    console.log(userData);
  }, [userData]);
  return (
    <>
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
          />
        </MenuItem>
        <MenuItem>
          <ButtonItem
            text="Add to Favourites"
            icon={<FavoriteBorderOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
          />
        </MenuItem>

        <MenuItem>
          <ButtonItem
            text="Close Chat"
            icon={<HighlightOffOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
          />
        </MenuItem>

        <hr />
        <MenuItem>
          <ButtonItem
            text="Block"
            icon={<BlockTwoToneIcon />}
            isMenu={true}
            className={menuItemStyle}
          />
        </MenuItem>

        <MenuItem>
          <ButtonItem
            text="Clear Chat"
            icon={<RemoveCircleOutlineOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
          />
        </MenuItem>
        <MenuItem>
          <ButtonItem
            text="Delete Chat"
            icon={<DeleteOutlineOutlinedIcon />}
            isMenu={true}
            className={menuItemStyle}
          />
        </MenuItem>
      </Menu>
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
              {userData?.isOnline ? "Online" : "Offline"}
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
    </>
  );
};

export default ChatHeader;
