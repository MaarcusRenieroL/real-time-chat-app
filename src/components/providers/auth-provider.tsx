"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { FC, ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <KindeProvider>{children}</KindeProvider>;
};
