import ChatIcon from "@mui/icons-material/Chat";
import { ReactComponent as StatusIcon } from "../../../assets/icons/StatusIcon.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import NavItem from "./navItem";
import useActiveUser from "../../hooks/useActiveUser";

const SideBar = () => {
  const { activeUser } = useActiveUser();
  return (
    <div className="flex flex-col h-screen justify-between items-center p-3 py-10 border-r shadow-lg">
      <div className="flex flex-col gap-4">
        <NavItem icon={<ChatIcon />} navigationUrl="/" />
        <NavItem
          icon={<StatusIcon className="text-yellow-50" />}
          navigationUrl="/status"
        />
        <NavItem icon={<SettingsIcon />} navigationUrl="settings" />
      </div>
      <NavLink
        to="/profile"
        className="w-10 h-10 bg-black rounded-full overflow-hidden"
      >
        <img
          src={activeUser?.photoUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </NavLink>
    </div>
  );
};

export default SideBar;
