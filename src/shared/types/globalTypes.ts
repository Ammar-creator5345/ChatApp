import { ReactNode } from "react";

export type NavItemProps = {
  icon: ReactNode;
  navigationUrl: string;
};

export type ActiveUserTypes = {
  displayName: string;
  email: string;
  isOnline: boolean;
  photoUrl: string;
  uid: string;
  about: string;
  phoneNumber: string;
  blockedUsers: string[];
};

export type AlertMessageProps = {
  text: string;
  open: boolean;
  duration?: number;
  onclose?: () => void;
};
