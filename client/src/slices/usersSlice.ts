import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  data: any;
  twoUsers: any;
  chats: string;
}

const initialState = {
  data: {},
  twoUsers: {},
  chats: [],
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
    setChats: (state: any, action: PayloadAction<any>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setUsers, setTwoUsers, setChats } = usersSlice.actions;
export default usersSlice.reducer;
