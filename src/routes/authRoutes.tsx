import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import AuthLayout from "../layouts/authLayout";

const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<SignUp />} />
  </Route>
);

export default AuthRoutes;
