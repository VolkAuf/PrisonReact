import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser, removeUser } from "../../store/userSlice.ts";
import { UserSessionData } from "../../entities/User.ts";

export const useAuth = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();

  const login = (usd: UserSessionData, jwt: string) => {
    setCookies("jwt", JSON.stringify(jwt)); // later save jwt
    dispatch(setUser(usd));
  };

  const logout = () => {
    removeCookies("jwt");
    dispatch(removeUser());
  };

  const checkIsAuthenticated = () => {
    const jwt: string = cookies["jwt"];
    return !!jwt;
  };

  const isAuthenticated = checkIsAuthenticated();

  return { isAuthenticated, login, logout };
};
