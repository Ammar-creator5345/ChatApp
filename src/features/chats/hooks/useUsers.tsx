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
  const [users, setUsers] = useState<UserTypes[] | null>(null);

  useEffect(() => {
    if (!open) return;
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (doc) => {
      let data = doc.docs.map((doc) => doc.data());
      setUsers(data as UserTypes[]);
      console.log(data);
    });
    return unsub;
  }, [user?.uid, open]);
  return { users };
};

export default useUsers;
