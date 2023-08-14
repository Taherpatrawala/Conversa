import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  data: any;
}

const initialState: UserInfoState = {
  data: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
