import { createContext, useContext } from "react";
import { selectedUserDataTypes } from "../types/chatTypes";

type SelectedUserContextTypes = {
  selectedUserData: selectedUserDataTypes | null;
};

export const SelectedUserContext =
  createContext<SelectedUserContextTypes | null>(null);
export const useSelectedUserContext = () => useContext(SelectedUserContext);
