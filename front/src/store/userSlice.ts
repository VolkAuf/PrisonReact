import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppState } from "./store.ts";
import { UserSessionData } from "../entities/User.ts";

export interface UserState {
  userSessionData: UserSessionData | null;
}

const initialState: UserState = {
  userSessionData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSessionData>) => {
      state.userSessionData = action.payload;
    },
    removeUser: (state) => {
      state.userSessionData = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const useUserSelector = () => useSelector((state: AppState) => state.user.userSessionData);
export default userSlice.reducer;
