import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserDetail {
  email: string;
  phone: string;
  fullName: string;
  role: string;
  avatar: string;
  id: string;
}

export interface UserState {
  user: UserDetail;
}

const initialState: UserState = {
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<UserDetail>) => {
      state.user = action.payload;
    },
    fetchAccount: (state, action: PayloadAction<UserDetail>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, fetchAccount } = userSlice.actions;

export default userSlice.reducer;
