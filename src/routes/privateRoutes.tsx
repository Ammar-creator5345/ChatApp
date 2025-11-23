import { Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Profile from "../pages/chats";

const PrivateRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/profile" element={<Profile />} />
  </Route>
);
export default PrivateRoutes;
