import { UserCosmetics } from "./user";

export interface Lobby<T = number> {
  id?: number;
  name: string;
  gameType: string;
  users: T[];
}

export interface LobbySocketData extends Lobby<UserCosmetics> {}

export interface LobbySettings {
  userCount: number;
}
