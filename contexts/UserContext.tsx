import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface User {
  name: string;
  email: string;
  password:string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: "Sample User",
    email: "john@example.com",
    password: 'test',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}

export interface Style {
  dark?: boolean
}

export interface StyleContextType {
  styleType: Style,
  setDark: React.Dispatch<React.SetStateAction<Style>>
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);