"use client";

import { RequestedUser } from "@/types/getServiceTypes";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: RequestedUser | null;
  setUser?: React.Dispatch<React.SetStateAction<RequestedUser | null>>;
};

const UserContext = createContext<UserContextType>({ user: null });

export function UserProvider({
  children,
  user: initialUser,
}: {
  children: React.ReactNode;
  user: RequestedUser | null;
}) {
  const [user, setUser] = useState<RequestedUser | null>(initialUser);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
