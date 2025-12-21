import { useEffect, useState } from "react";
import { ActiveUserTypes } from "../types/globalTypes";
import { useAuth } from "../../features/auth/context/authContext";
import { getActiveUser } from "../services/firebase/userService";

const useActiveUser = (otherUid: string) => {
  const { user } = useAuth();
  const [activeUser, setActiveUser] = useState<ActiveUserTypes | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  useEffect(() => {
    if (!activeUser || !otherUid) return;
    const status = activeUser?.blockedUsers?.includes(otherUid) ?? false;
    setIsBlocked(status);
  }, [activeUser, otherUid]);

  useEffect(() => {
    if (!user) return;
    const unSub = getActiveUser(user.uid, (data) => {
      setActiveUser(data);
      console.log("Active User", data);
    });
    return () => unSub();
  }, [user]);
  return { activeUser, isBlocked };
};

export default useActiveUser;
