import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "../slices/userInfoSlice";
import usersSlice from "../slices/usersSlice";
import activeUsersSlice from "../slices/activeUsersSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    users: usersSlice,
    activeUsers: activeUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
