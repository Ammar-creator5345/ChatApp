import { Outlet } from "react-router-dom";
import SideBar from "../shared/components/layout/sideBar";

const MainLayout = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
