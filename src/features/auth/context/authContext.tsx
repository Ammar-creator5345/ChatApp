import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../config/firebase/InitializeFireBase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType>({ user: null });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unSub;
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
