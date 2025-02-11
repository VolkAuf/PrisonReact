import { useContext } from "react";
import { AuthContext } from "../../features/auth/AuthContext.ts";
import { User, UserSessionData } from "../../entities/User.ts";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const isTempUser = (): boolean => {
    return !!authContext?.userSessionData?.email;
  };

  const login = (user: User) => {
    const userSessionData = user as UserSessionData;
    authContext?.login(userSessionData);
  };

  const logout = () => {
    authContext?.logout();
  };

  return { sessionData: authContext?.userSessionData, login, logout, isTempUser };
};
