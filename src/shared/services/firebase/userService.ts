import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase/InitializeFireBase";
import { ActiveUserTypes } from "../../types/globalTypes";

export const getActiveUser = async (activeUserId: string) => {
  const docRef = doc(db, "users", activeUserId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data() as ActiveUserTypes;
    return data;
  } else {
    console.log("No such document!");
    return null;
  }
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
