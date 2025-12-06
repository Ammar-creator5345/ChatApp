import { Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Chats from "../pages/chats";

const PrivateRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Chats />} />
  </Route>
);
export default PrivateRoutes;
