import { axiosInstance } from "./axiosInstance";
import { AxiosResponse } from "axios";
import { Lobby } from "../models/lobby";

export const getLobby = async (name: string) => {
  return axiosInstance.get("/crocoLobby").then(({ data }: AxiosResponse<Lobby[]>) => {
    if (data && data.length > 0) {
      return (data as Lobby[]).find((value) => value.name === name);
    }
    return null;
  });
};

export const createLobby = async (lobby: Lobby) => {
  console.table(lobby.users);
  return axiosInstance.post("/crocoLobby", lobby).then(({ data }: AxiosResponse<Lobby>) => data);
};

export const updateLobby = async (lobby: Lobby) => {
  return axiosInstance.put(`/crocoLobby/${lobby.id}`, lobby).then(({ data }: AxiosResponse<Lobby>) => data);
};
