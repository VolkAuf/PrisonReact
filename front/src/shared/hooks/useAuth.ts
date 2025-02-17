import { useContext } from "react";
import { AuthContext } from "../../features/auth/AuthContext.ts";
import { UserSessionData } from "../../entities/User.ts";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const isTempUser = (): boolean => {
    return !!authContext?.userSessionData?.email;
  };

  const login = (userSessionData: UserSessionData) => {
    authContext?.login(userSessionData);
  };

  const logout = () => {
    authContext?.logout();
  };

  return { sessionData: authContext?.userSessionData, login, logout, isTempUser };
};
