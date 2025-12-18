import { useEffect, useState } from "react";
import { ActiveUserTypes } from "../types/globalTypes";
import { useAuth } from "../../features/auth/context/authContext";
import { getActiveUser } from "../services/firebase/userService";

const useActiveUser = () => {
  const { user } = useAuth();
  const [activeUser, setActiveUser] = useState<ActiveUserTypes | null>(null);
  useEffect(() => {
    const getActiveUserData = async () => {
      if (!user) return;
      const res = await getActiveUser(user.uid);
      console.log("Active User", res);
      setActiveUser(res);
    };
    getActiveUserData();
  }, [user]);
  return { activeUser };
};

export default useActiveUser;
