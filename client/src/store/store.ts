import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "../slices/userInfoSlice";
import usersSlice from "../slices/usersSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
