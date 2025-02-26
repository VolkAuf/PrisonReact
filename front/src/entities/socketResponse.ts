import { Lobby, LobbySettings } from "./lobby.ts";

export interface LobbyResponseModel {
  lobby: Lobby;
  settings: LobbySettings;
}

export interface SocketResponse {
  sender: string;
  message: string;
  lobbyResponse: LobbyResponseModel;
}
