import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { SelectedChatTypes, selectedUserDataTypes } from "../types/chatTypes";

type SelectedUserContextTypes = {
  selectedUserData: selectedUserDataTypes | null;
  openDetailsDrawer: boolean;
  setOpenDetailsDrawer: Dispatch<SetStateAction<boolean>>;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatTypes | null>>;
};

export const SelectedUserContext = createContext<SelectedUserContextTypes>({
  selectedUserData: null,
  openDetailsDrawer: false,
  setOpenDetailsDrawer: () => {},
  setSelectedChat: () => {},
});
export const useSelectedUserContext = () => useContext(SelectedUserContext);
