import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  data: any;
  twoUsers: any;
  privateRoomValue: string;
  chats: {
    senderId: string;
    receiverId: string;
    roomId: string;
    message: string;
    timestamp: string;
  };
}

const initialState = {
  data: {},
  twoUsers: {},
  privateRoomValue: "",
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
    setPrivateRoomValue: (state, action: PayloadAction<any>) => {
      state.privateRoomValue = action.payload;
    },
    setChats: (state: any, action: PayloadAction<any>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setUsers, setTwoUsers, setChats, setPrivateRoomValue } =
  usersSlice.actions;
export default usersSlice.reducer;
