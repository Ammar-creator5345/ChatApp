import ChatIcon from "@mui/icons-material/Chat";
import { ReactComponent as StatusIcon } from "../../../assets/icons/StatusIcon.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../features/auth/context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";
import NavItem from "./navItem";
import { currentUserDataTypes } from "../../types/globalTypes";

const SideBar = () => {
  const { user } = useAuth();
  const [currentUserData, setCurrentUserData] =
    useState<currentUserDataTypes | null>(null);
  useEffect(() => {
    const getCurrentUserData = async () => {
      if (!user?.uid) return;
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("current user Data:", docSnap.data());
        const data = docSnap.data();
        setCurrentUserData(data as currentUserDataTypes);
      } else {
        console.log("No such document!");
      }
    };
    getCurrentUserData();
  }, [user?.uid]);
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
          src={currentUserData?.photoURL}
          alt=""
          className="w-full h-full object-cover"
        />
      </NavLink>
    </div>
  );
};

export default SideBar;
