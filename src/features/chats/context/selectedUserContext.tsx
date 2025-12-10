import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { selectedUserDataTypes } from "../types/chatTypes";

type SelectedUserContextTypes = {
  selectedUserData: selectedUserDataTypes | null;
  openDetailsDrawer: boolean;
  setOpenDetailsDrawer: Dispatch<SetStateAction<boolean>>;
};

export const SelectedUserContext = createContext<SelectedUserContextTypes>({
  selectedUserData: null,
  openDetailsDrawer: false,
  setOpenDetailsDrawer: () => {},
});
export const useSelectedUserContext = () => useContext(SelectedUserContext);
