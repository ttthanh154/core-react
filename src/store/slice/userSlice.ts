import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetail {
  email: string;
  phone: string;
  fullName: string;
  role: string;
  avatar: string;
  id: string;
}

export interface UserState {
  isAuthenticated: boolean;
  user: UserDetail;
}

const initialState: UserState = {
  isAuthenticated: false,
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
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchAccount: (state, action: PayloadAction<UserDetail>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      Object.values(state.user).forEach((key: string) => {
        key = "";
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, fetchAccount, logout } = userSlice.actions;

export default userSlice.reducer;
