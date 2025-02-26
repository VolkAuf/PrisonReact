import { axiosInstance } from "./axiosInstance";
import { User, UserCosmetics } from "../models/user";
import { AxiosResponse } from "axios";

export const getUser = async (email: string) => {
  return axiosInstance.get("/crocoUsers").then(({ data }: AxiosResponse<User[]>) => {
    if (data && data.length > 0) {
      return (data as User[]).find((value) => value.email === email);
    }
    return null;
  });
};

export const getUserById = async (userId: number) => {
  return axiosInstance.get("/crocoUsers").then(({ data }: AxiosResponse<User[]>) => {
    if (data && data.length > 0) {
      return (data as User[]).find((value) => value.id === userId);
    }
    return null;
  });
};

export const getUsersByIds = async (ids: number[]) => {
  return axiosInstance.get("/crocoUsers").then(({ data }: AxiosResponse<User[]>) => {
    if (data && data.length > 0) {
      return (data as User[]).filter((user: User) => !!ids.find((value) => value === user.id));
    }
    return null;
  });
};

export const getUsersCosmeticByIds = async (ids: number[]) => {
  const users = await getUsersByIds(ids);
  if (!users) return null;
  return users.map((user) => {
    return {
      nickname: user.nickname,
      avatar: user.avatar,
    } as UserCosmetics;
  });
};

export const createUser = async (user: User) => {
  return axiosInstance.post("/crocoUsers", user);
};
