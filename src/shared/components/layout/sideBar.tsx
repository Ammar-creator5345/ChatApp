import ChatIcon from "@mui/icons-material/Chat";
import { ReactComponent as StatusIcon } from "../../../assets/icons/StatusIcon.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import NavItem from "./navItem";
import useActiveUser from "../../hooks/useActiveUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import ConfirmationModal from "../../../features/chats/components/layout/confirmationModal";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../features/auth/context/authContext";
import { auth, db } from "../../../config/firebase/InitializeFireBase";
import { signOut } from "firebase/auth";
import AlertMessage from "./alertMessage";

const SideBar = () => {
  const { activeUser } = useActiveUser("otherId");
  const [modalAction, setModalAction] = useState<"logout" | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const handleLogOut = () => {
    updateDoc(doc(db, "users", user?.uid as string), {
      isOnline: false,
      lastOnline: new Date(),
    });
    signOut(auth)
      .then(() => {
        console.log("log out successfull");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowAlert(true);
        setAlertMessage("User is log out successfully");
      });
  };

  return (
    <>
      <AlertMessage
        text={alertMessage}
        open={showAlert}
        onclose={() => setShowAlert(false)}
      />
      <ConfirmationModal
        text={modalAction ? "Are you sure you want to log out?" : ""}
        open={!!modalAction}
        setOpen={() => setModalAction(null)}
        onConfirm={() => {
          if (modalAction === "logout") handleLogOut();
          setModalAction(null);
        }}
      />
      <div className="flex flex-col h-screen justify-between items-center p-3 py-10 border-r shadow-lg">
        <div className="flex flex-col gap-4">
          <NavItem icon={<ChatIcon />} navigationUrl="/" />
          <NavItem
            icon={<StatusIcon className="text-yellow-50" />}
            navigationUrl="/status"
          />
          <NavItem icon={<SettingsIcon />} navigationUrl="settings" />
          <button
            onClick={() => setModalAction("logout")}
            className="h-9 w-9 rounded-full hover:bg-[#e2dfdf] center"
          >
            <LogoutIcon sx={{ fontSize: "20px" }} />
          </button>
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
    </>
  );
};

export default SideBar;
