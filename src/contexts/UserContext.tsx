import React, { ReactNode, useState } from 'react';
import { User } from 'models';
import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';

interface UserContextType {
  user: User | null;
  loginUser: (userInfo: User) => void;
  logoutUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType,
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = (userInfo: User) => {
    setUser(userInfo);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
