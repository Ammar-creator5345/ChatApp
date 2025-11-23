import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../auth/pages/login";
import SignUp from "../auth/pages/signUp";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
