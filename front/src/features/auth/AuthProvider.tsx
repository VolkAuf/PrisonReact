import { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserSessionData } from "../../entities/User.ts";
import { AuthContext } from "./AuthContext.ts";

export interface AuthContextInterface {
  userSessionData: UserSessionData | null | undefined;
  login: (data: UserSessionData) => void;
  logout: () => void;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userSessionData, setUserSessionData] = useState<UserSessionData | null | undefined>(undefined);
  const [cookies, setCookies, removeCookies] = useCookies();

  const login = (userSD: UserSessionData) => {
    setUserSessionData(userSD);
    setCookies("usd", JSON.stringify(userSD), { path: "/" });
  };

  const logout = () => {
    removeCookies("usd");
    setUserSessionData(null);
  };

  useEffect(() => {
    const userSessionData: UserSessionData = cookies["usd"];
    if (userSessionData) setUserSessionData(userSessionData);
    else setUserSessionData(null);
  }, []);

  return <AuthContext.Provider value={{ userSessionData, login, logout }}>{children}</AuthContext.Provider>;
}
