import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetail {
  email: string;
  phone: string;
  fullName: string;
  role?: string;
  avatar: string;
  id?: string;
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
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    },
    uploadAvatar: (state, action: PayloadAction<any>) => {
      state.user.avatar = action.payload
    }
    ,
    updateInfo: (state, action: PayloadAction<UserDetail>) => {
      state.user.fullName = action.payload.fullName;
      state.user.phone = action.payload.phone;
      state.user.avatar = action.payload.avatar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, fetchAccount, logout, uploadAvatar, updateInfo } = userSlice.actions;

export default userSlice.reducer;
