import { Outlet, Route, Routes } from "react-router-dom";
import Profile from "../pages/chats.js";

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
