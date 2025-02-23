import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser, removeUser } from "../../store/userSlice.ts";
import { UserSessionData } from "../../entities/user.ts";
import { setBearer } from "../libs/axios.ts";
import { getUserSessionDataRequest } from "../../features/auth/userSessionApi.ts";

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

  const setUserSessionData = async () => {
    try {
      const userResponse = await getUserSessionDataRequest();
      if (userResponse.user) {
        dispatch(setUser(userResponse.user));
        return;
      }
      console.log(userResponse.message);
      alert(userResponse.message);
    } catch (err) {
      console.log(err);
      alert(err);
    }
    logout();
  };

  return { isAuthenticated, getJWT, setAxiosBearer, login, logout, setUserSessionData };
};
