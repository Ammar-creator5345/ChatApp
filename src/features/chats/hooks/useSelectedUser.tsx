import { useEffect, useRef, useState } from "react";
import { SelectedChatTypes, selectedUserDataTypes } from "../types/chatTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";

const useSelectedUser = (otherUid: string) => {
  const [selectedUserData, setSelectedUserData] =
    useState<selectedUserDataTypes | null>(null);
  const userCache = useRef<Record<string, selectedUserDataTypes>>({});
  useEffect(() => {
    if (!otherUid) return;
    if (userCache.current[otherUid]) {
      setSelectedUserData(userCache.current[otherUid]);
    }
    const fetchUser = async () => {
      const docRef = doc(db, "users", otherUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: selectedUserDataTypes = {
          displayName: data?.displayName,
          email: data?.email,
          isOnline: data?.isOnline,
          photoUrl: data?.photoUrl,
          uid: data?.uid,
          about: data?.about,
          phoneNumber: data?.phoneNumber,
          lastOnline: data?.lastOnline,
        };
        console.log("selected user:", userData);
        setSelectedUserData(userData);
        userCache.current[otherUid] = userData;
      } else {
        console.log("No such document!");
        setSelectedUserData(null);
      }
    };
    fetchUser();
  }, [otherUid]);
  return { selectedUserData };
};

export default useSelectedUser;
