// import { collection, getDoc, query, where } from "firebase/firestore";
// import { db } from "../../../config/firebase/InitializeFireBase";

// type getDocTypes = {
//   currentUserId: string;
//   path: string;
// };

// export const getDocs = async ({ currentUserId, path }: getDocTypes) => {
//   try {
//     const q = query(
//       collection(db, path),
//       where("participants", "array-contains", currentUserId)
//     );
//     const snapshot: any = await getDocs(q);
//     return snapshot;
//   } catch (err) {
//     throw err;
//   }
// };
