import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Dispatch, SetStateAction } from "react";
import { HeaderProps } from "../../../types/chatTypes";

const Header = ({ setOpen }: HeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">NexChat</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="center p-[7px] rounded-full hover:bg-[#e2c8c8]"
          >
            <AddCommentOutlinedIcon />
          </button>
          <button className="center p-[7px] rounded-full hover:bg-[#e2c8c8]">
            <MoreVertIcon />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-0 border border-black px-3 rounded-full m-2">
        <SearchOutlinedIcon />
        <input
          type="text"
          className="bg-transparent w-full p-2 outline-none border-none"
          placeholder="Search any chat..."
        />
      </div>
      <div className="flex items-center gap-2 m-2">
        <button className="rounded-full px-4 py-[2px] border border-[#363636] center hover:bg-[#e2c8c8]">
          All
        </button>
        <button className="rounded-full px-4 py-[2px] border border-[#363636] center hover:bg-[#e2c8c8]">
          Unread
        </button>
        <button className="rounded-full px-4 py-[2px] border border-[#363636] center hover:bg-[#e2c8c8]">
          Favourites
        </button>
      </div>
    </div>
  );
};

export default Header;
