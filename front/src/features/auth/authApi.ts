import { AxiosResponse } from "axios";
import { axiosAuth } from "../../shared/libs/axios.ts";
import { User, UserCredentials } from "../../entities/User.ts";

export const checkIfUserExists = async (user: User) => {
  return axiosAuth.get("/crocoUsers").then(({ data }: AxiosResponse<User[]>) => {
    if (data && data.length > 0) {
      const value = data.find((value) => value.email === user.email);
      if (value) return true;
    }
    return false;
  });
};

export const getUserByCredentials = async (credentials: UserCredentials) => {
  return axiosAuth.get("/crocoUsers").then(({ data }: AxiosResponse<UserCredentials[]>) => {
    if (data && data.length > 0) {
      return (data as User[]).find(
        (value) => value.email === credentials.email && value.password === credentials.password,
      );
    }
    return null;
  });
};

export const createUser = async (user: User) => {
  return axiosAuth.post("/crocoUsers", user);
};
