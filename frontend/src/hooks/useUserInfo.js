import { useContext } from "react";
import { UserInfoContext } from "../providers/UserInfoProvider";

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};