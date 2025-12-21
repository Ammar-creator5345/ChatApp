import { Popover } from "@mui/material";
import ButtonItem from "../../../../components/buttonItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplyIcon from "@mui/icons-material/Reply";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type PropsTypes = {
  open: boolean;
  id: string | undefined;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
};

const OptionsMenu = ({ open, id, anchorEl, handleClose }: PropsTypes) => {
  const MenuItemStyle: string =
    "flex items-center gap-2 rounded-md p-2 pr-[50px] hover:bg-[#e4e2e2]";

  const handleTextCopy = () => {
    navigator.clipboard.writeText("some Text");
    handleClose();
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
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
        />
      </div>
    </Popover>
  );
};

export default OptionsMenu;
