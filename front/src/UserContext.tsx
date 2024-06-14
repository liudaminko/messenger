import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  icon: string;
}

interface UserContextType {
  currentUser: User;
  chattingUser: User;
  setChattingUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser] = useState<User>({
    id: 1,
    name: "Liuda",
    icon: "/you.jpg",
  });
  const [chattingUser, setChattingUser] = useState<User>({
    id: 2,
    name: "Oxana",
    icon: "/john.jpg",
  });

  return (
    <UserContext.Provider
      value={{ currentUser, chattingUser, setChattingUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
