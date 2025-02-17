import { AxiosError } from "axios";
import { axiosAuth } from "../../shared/libs/axios.ts";
import { UserCredentials, UserSessionData } from "../../entities/User.ts";

interface UserResponse {
  message: string;
  user?: UserSessionData;
}

export const loginRequest = async (userCredentials: UserCredentials) => {
  return postUserRequest(userCredentials, "login");
};

export const registerRequest = async (userCredentials: UserCredentials) => {
  return postUserRequest(userCredentials, "register");
};

const postUserRequest = async (userCredentials: UserCredentials, uri: string) => {
  const url = `${import.meta.env.VITE_SERVER_API_USERS}/${uri}`;
  try {
    const res = await axiosAuth.post(url, userCredentials);
    return res.data as UserResponse;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return { message: error.message };
    }
    return { message: "Something went wrong" };
  }
};
