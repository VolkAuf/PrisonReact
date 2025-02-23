import { AxiosError } from "axios";
import axiosAuth from "../../shared/libs/axios.ts";
import { UserCredentials, UserSessionData } from "../../entities/user.ts";

interface UserResponse {
  message: string;
  user?: UserSessionData;
  token?: string;
}

type RequestMethod = "GET" | "POST";

const requestURL = (uri: string) => `${import.meta.env.VITE_SERVER_API_USERS}/${uri}`;

export const loginRequest = async (userCredentials: UserCredentials) => {
  return userRequest("login", "POST", userCredentials);
};

export const registerRequest = async (userCredentials: UserCredentials) => {
  return userRequest("register", "POST", userCredentials);
};

export const getUserSessionDataRequest = async () => {
  return userRequest("getUser", "GET");
};

const userRequest = async (uri: string, method: RequestMethod, userCredentials?: UserCredentials) => {
  try {
    const url = requestURL(uri);
    switch (method) {
      case "GET": {
        const response = await axiosAuth.get(url);
        return response.data as UserResponse;
      }
      case "POST": {
        const response = await axiosAuth.post(url, userCredentials!);
        return response.data as UserResponse;
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return { message: error.message };
    }
    return { message: "Something went wrong" };
  }
};
