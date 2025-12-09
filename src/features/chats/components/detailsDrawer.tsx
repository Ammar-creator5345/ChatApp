import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectedUserDataTypes } from "../types/chatTypes";
import { Dispatch, SetStateAction } from "react";

type DetailsDrawerProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const drawerWidth = 300;

const DetailsDrawer = ({ open, setOpen }: DetailsDrawerProps) => {
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
          padding: "16px",
          //   marginRight: "300px",
        },
      }}
    >
      <div>some</div>
      <button onClick={() => setOpen(false)}>close</button>
    </Drawer>
  );
};

export default DetailsDrawer;
