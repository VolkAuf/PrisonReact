import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import lobbyReducer from "./lobbySlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lobby: lobbyReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
