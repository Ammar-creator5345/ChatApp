import { NavLink } from "react-router-dom";
import { NavItemProps } from "../../types/globalTypes";

const NavItem = ({ icon, navigationUrl }: NavItemProps) => {
  return (
    <NavLink
      to={navigationUrl}
      className={({ isActive }) =>
        `rounded-full p-2 flex items-center justify-center ${
          isActive ? "bg-[#e2dfdf]" : "hover:bg-[#e2dfdf]"
        }`
      }
    >
      {icon}
    </NavLink>
  );
};
export default NavItem;
