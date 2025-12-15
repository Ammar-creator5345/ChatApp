import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase/InitializeFireBase";
import { UserTypes } from "../types/chatTypes";
import { useAuth } from "../../auth/context/authContext";

type propsTypes = {
  open: boolean;
};

const useUsers = ({ open }: propsTypes) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserTypes[] | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (doc) => {
      let data = doc.docs.map((doc) => doc.data());
      setUsers(data as UserTypes[]);
      console.log("All users", data);
      setLoading(false);
    });
    return unsub;
  }, [user?.uid, open]);
  return { users, loading };
};

export default useUsers;
