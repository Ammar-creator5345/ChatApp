import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DetailsDrawerTypes,
  selectedUserDataTypes,
} from "../../types/chatTypes";
import { Dispatch, memo, SetStateAction } from "react";
import { useSelectedUserContext } from "../../context/selectedUserContext";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BlockIcon from "@mui/icons-material/Block";
import ButtonItem from "../../components/buttonItem";

export const drawerWidth = 400;

const DetailsDrawer = ({ selectedUserData }: DetailsDrawerTypes) => {
  const { openDetailsDrawer: open, setOpenDetailsDrawer: setOpen } =
    useSelectedUserContext();
  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          padding: "16px 0",
          borderLeft: "1px solid",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col h-screen">
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg center hover:bg-[#ecebeb]"
          >
            <CloseIcon />
          </button>
          <h1 className="text-lg font-bold">Contact Info</h1>
          <button className="p-1 rounded-lg center hover:bg-[#ecebeb]">
            <EditIcon />
          </button>
        </div>
        <div className="flex-1 overflow-auto px-3 py-5">
          <div>
            <img
              src={selectedUserData?.photoUrl}
              alt=""
              className="w-[120px] rounded-full aspect-square object-cover m-auto"
            />
            <h1 className="text-3xl font-bold text-center mt-2">
              {selectedUserData?.displayName}
            </h1>
            <h1 className="text-lg font-bold text-center mt-1">
              {selectedUserData?.phoneNumber}
            </h1>
          </div>
          <hr className="my-3" />
          <div>
            <h1 className="font-bold text-[#666666]">About</h1>
            <h1 className="font-[500] text-lg">{selectedUserData?.about}</h1>
          </div>
          <hr className="my-3" />
          <ButtonItem text="Starred Messages" icon={<StarOutlineIcon />} />
          <ButtonItem
            text={`Blocked ${selectedUserData?.displayName}`}
            icon={<BlockIcon />}
          />
          <ButtonItem text="Add to Favourites" icon={<FavoriteBorderIcon />} />
          <ButtonItem text="Delete chat" icon={<DeleteIcon />} />
        </div>
      </div>
    </Drawer>
  );
};

export default DetailsDrawer;
