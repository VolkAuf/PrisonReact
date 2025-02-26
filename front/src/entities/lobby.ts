import { UserCosmetics } from "./user.ts";

export interface Lobby {
  name: string;
  gameType: string; //TODO: luto dohuya podpravim
  users: UserCosmetics[];
}

export interface LobbySettings {
  userCount: number;
}
