import { axiosInstance } from "./axiosInstance";
import { User } from "../models/user";
import { AxiosResponse } from "axios";

export const getUser = async (email: string) => {
  return axiosInstance.get("/crocoUsers").then(({ data }: AxiosResponse<User[]>) => {
    if (data && data.length > 0) {
      return (data as User[]).find((value) => value.email === email);
    }
    return null;
  });
};

export const createUser = async (user: User) => {
  return axiosInstance.post("/crocoUsers", user);
};
