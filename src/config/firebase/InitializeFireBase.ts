import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface fireBaseConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
export const firebaseConfig: fireBaseConfigType = {
  apiKey: "AIzaSyDlbxAVSOZWXIwuVh2Nk6WowZKnJzzK-Zk",
  authDomain: "chatapp-11d9a.firebaseapp.com",
  projectId: "chatapp-11d9a",
  storageBucket: "chatapp-11d9a.firebasestorage.app",
  messagingSenderId: "862747380242",
  appId: "1:862747380242:web:d2be85e87d11768f34e6cb",
  measurementId: "G-N7HD74NVPC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
