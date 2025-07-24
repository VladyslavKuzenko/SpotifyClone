import { createContext } from "react";

export const UserInfoContext = createContext(undefined);

export const UserInfoProvider = ({ children }) => {
    
  return (
    <UserInfoContext.Provider value={{}}>{children}</UserInfoContext.Provider>
  );
};
