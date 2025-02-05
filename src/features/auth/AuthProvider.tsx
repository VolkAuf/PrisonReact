import { ReactNode, useEffect, useState } from "react";
import { UserSessionData } from "../../entities/User.module.ts";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext.ts";

export interface AuthContextInterface {
  userSessionData: UserSessionData | null | undefined;
  login: (data: UserSessionData) => void;
  logout: () => void;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userSessionData, setUserSessionData] = useState<UserSessionData | null | undefined>(undefined);
  const [cookies, setCookies, removeCookies] = useCookies();

  useEffect(() => {
    const userSessionData = cookies["usd"];
    if (userSessionData) setUserSessionData(userSessionData as UserSessionData);
    else setUserSessionData(null);
  }, []);

  const login = (userSD: UserSessionData) => {
    setUserSessionData(userSD);
    setCookies("usd", JSON.stringify(userSD), { path: "/" });
  };

  const logout = () => {
    removeCookies("usd");
    setUserSessionData(null);
  };

  return <AuthContext.Provider value={{ userSessionData, login, logout }}>{children}</AuthContext.Provider>;
}
