import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  activeUsersData: null,
};

const activeUsersSlice = createSlice({
  name: "activeUsers",
  initialState,
  reducers: {
    setActiveUsers: (state, action: PayloadAction<any>) => {
      state.activeUsersData = action.payload;
    },
  },
});

export const { setActiveUsers } = activeUsersSlice.actions;

export default activeUsersSlice.reducer;
