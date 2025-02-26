import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppState } from "./store.ts";
import { Lobby, LobbySettings } from "../entities/lobby.ts";

interface LobbyState {
  lobby: Lobby | null;
  settings: LobbySettings | null;
  isConnected: boolean;
}

const initialState: LobbyState = {
  lobby: null,
  settings: null,
  isConnected: false,
};

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setLobby: (state, action: PayloadAction<Lobby>) => {
      state.lobby = action.payload;
    },
    setConnection: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    removeLobby: (state) => {
      state.lobby = null;
    },
    setSettings: (state, action: PayloadAction<LobbySettings>) => {
      state.settings = action.payload;
    },
    removeSettings: (state) => {
      state.lobby = null;
    },
  },
});

export const { setLobby, removeLobby, setConnection, setSettings, removeSettings } = lobbySlice.actions;
export const useConnectionSelector = () => useSelector((state: AppState) => state.lobby.isConnected);
export const useLobbySelector = () => useSelector((state: AppState) => state.lobby.lobby);
export const useSettingsSelector = () => useSelector((state: AppState) => state.lobby.settings);
export default lobbySlice.reducer;
