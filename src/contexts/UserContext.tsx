"use client";
import { User } from "@/interfaces/users";
import { createContext, useContext } from "react";

const UserContext = createContext(null as User | null);

export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
