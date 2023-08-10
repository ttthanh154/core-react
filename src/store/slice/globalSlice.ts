import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading } = globalSlice.actions;

export default globalSlice.reducer;
