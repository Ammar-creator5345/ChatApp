import { useEffect } from "react";
import { useSelectedUserContext } from "../context/selectedUserContext";

const ChatHeader = () => {
  const context = useSelectedUserContext();
  const userData = context?.selectedUserData;
  useEffect(() => {
    if (!userData) return;
    console.log(userData);
  }, [userData]);
  return (
    <div className="bg-white border-b border-b-black flex items-center gap-3 p-2">
      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src={userData?.photoUrl}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-lg font-bold">{userData?.displayName}</p>
        <p className="text-sm">{userData?.isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
