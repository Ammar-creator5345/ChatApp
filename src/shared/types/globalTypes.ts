import { ReactNode } from "react";

export type NavItemProps = {
  icon: ReactNode;
  navigationUrl: string;
};

export type currentUserDataTypes = {
  displayName: string;
  email: string;
  isOnline: boolean;
  photoUrl: string;
  uid: string;
  about: string;
  phoneNumber: string;
};
