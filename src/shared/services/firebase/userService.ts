import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";
import { ActiveUserTypes } from "../../types/globalTypes";

export const getActiveUser = (
  activeUserId: string,
  callback: (data: ActiveUserTypes | null) => void
) => {
  const docRef = doc(db, "users", activeUserId);
  return onSnapshot(docRef, (snap) => {
    callback(snap.data() as ActiveUserTypes);
  });
};

export const blockUser = async (activeUserId: string, otherUserId: string) => {
  const docRef = doc(db, "users", activeUserId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (data) {
    updateDoc(docRef, {
      blockedUsers: arrayUnion(otherUserId),
    });
  }
};
export const unBlockUser = async (
  activeUserId: string,
  otherUserId: string
) => {
  const docRef = doc(db, "users", activeUserId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (data) {
    updateDoc(docRef, {
      blockedUsers: arrayRemove(otherUserId),
    });
  }
};
