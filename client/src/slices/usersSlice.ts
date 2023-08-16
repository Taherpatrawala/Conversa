import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  twoUsers: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setTwoUsers: (state, action: PayloadAction<any>) => {
      state.twoUsers = action.payload;
    },
  },
});

export const { setUsers, setTwoUsers } = usersSlice.actions;
export default usersSlice.reducer;
