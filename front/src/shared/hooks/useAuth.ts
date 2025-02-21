import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser, removeUser } from "../../store/userSlice.ts";
import { UserSessionData } from "../../entities/User.ts";
import { setBearer } from "../libs/axios.ts";

export const useAuth = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();

  const login = (usd: UserSessionData, jwt: string) => {
    setCookies("jwt", jwt);
    setBearer(jwt);
    dispatch(setUser(usd));
  };

  const logout = () => {
    removeCookies("jwt");
    dispatch(removeUser());
  };

  const setAxiosBearer = () => {
    setBearer(getJWT());
  };

  const getJWT = () => {
    const jwt: string = cookies["jwt"];
    return jwt;
  };

  const checkIsAuthenticated = () => {
    return !!getJWT();
  };

  const isAuthenticated = checkIsAuthenticated();

  return { isAuthenticated, getJWT, setAxiosBearer, login, logout };
};
